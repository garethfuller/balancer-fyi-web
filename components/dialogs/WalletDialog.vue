<template>
  <div>
    <BaseDialog :show="showDialog" @close="setShowDialog(false)">
      <BaseCard>
        <BaseCardTitle :title="title" />
        <BaseCardContent>
          <div v-if="!!error" class="border-red-500 bg-red-100 text-red-500 rounded p-4 mb-4">
            {{ error }}
          </div>
          <BaseGrid>
            <BaseGridItem width="full" class="md:w-1/2">
              <div
                class="wallet-btn bg-gray-100 dark:bg-gray-800 py-8 flex flex-col items-center justify-end cursor-pointer rounded hover:bg-gray-200 hover:text-gray-800"
                @click="connect('metamask')"
              >
                <img :src="require('~/assets/images/wallets/metamask.svg')" alt="MetaMask logo" class="h-24 lg:h-32 w-auto">
                <span class="font-bold text-lg">
                  MetaMask
                </span>
              </div>
            </BaseGridItem>
            <BaseGridItem width="full" class="md:w-1/2">
              <div
                class="wallet-btn h-full bg-gray-100 dark:bg-gray-800 py-8 flex flex-col items-center justify-end cursor-pointer rounded hover:bg-gray-200 hover:text-gray-800"
                @click="connect('walletConnect')"
              >
                <img :src="require('~/assets/images/wallets/walletconnect.svg')" alt="WalletConnect logo" class="h-16 lg:h-20 w-auto mb-6">
                <span class="font-bold text-lg">
                  WalletConnect
                </span>
              </div>
            </BaseGridItem>
          </BaseGrid>
        </BaseCardContent>
      </BaseCard>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions } from 'vuex'
import { Web3Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

interface ConnectInfo {
  chainId: string;
}

export default Vue.extend({
  name: 'WalletDialog',

  props: {
    title: { type: String, default: 'Connect a wallet' }
  },

  data () {
    return {
      error: '',
      walletConnect: {
        connector: new WalletConnect({
          bridge: 'https://bridge.walletconnect.org',
          qrcodeModal: QRCodeModal
        })
      }
    }
  },

  computed: {
    showDialog (): boolean { return this.$store.state.auth.showDialog },
    provider (): Web3Provider { return this.$store.state.auth.provider },
    signer (): Signer { return this.$store.state.auth.signer },
    address (): string { return this.$store.state.auth.address },
    ensName (): string { return this.$store.state.auth.ensName },
    connecting () : boolean { return this.$store.state.connecting },
    isConnected () : boolean { return this.$store.getters['auth/isConnected'] },

    hasBrowserProvider (): boolean {
      return typeof window.ethereum !== 'undefined'
    }
  },

  async mounted () {
    try {
      this.setConnecting(true)
      if (this.walletConnect.connector.connected) this.walletConnect.connector.killSession()
      this.addWalletConnectListeners()
      if (this.hasBrowserProvider) {
        await this.getCurrentAccount()
        this.listenForAccountChange()
        this.listenForNetworkChange()
        this.listenForConnection()
        this.listenForDisconnection()
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      this.setConnecting(false)
    }
  },

  beforeDestroy () {
    this.walletConnect.connector.killSession()
  },

  methods: {
    ...mapActions({
      getProvider: 'auth/getProvider',
      getSigner: 'auth/getSigner',
      getAddress: 'auth/getAddress',
      getEnsName: 'auth/getEnsName'
    }),

    ...mapMutations({
      setProvider: 'auth/setProvider',
      setSigner: 'auth/setSigner',
      setAddress: 'auth/setAddress',
      setEnsName: 'auth/setEnsName',
      setConnecting: 'auth/setConnecting',
      setShowDialog: 'auth/setShowDialog'
    }),

    connect (wallet: string) : void {
      this.setConnecting(true)
      try {
        switch (wallet) {
          case 'walletConnect':
            this.connectWalletConnect()
            break
          default:
            this.connectBrowser()
            break
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.setConnecting(false)
      }
    },

    async connectBrowser () : Promise<void> {
      if (this.hasBrowserProvider) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        await this.getCurrentAccount()
        this.closeDialog()
      } else {
        this.error = 'Browser provider not found.'
      }
    },

    connectWalletConnect () {
      try {
        this.walletConnect.connector.killSession()
        this.walletConnect.connector.createSession()
      } catch (error) {
        this.error = error.message
      }
    },

    async getCurrentAccount () : Promise<void> {
      try {
        this.getProvider()
        await this.getSigner()
        await this.getAddress()
        await this.getEnsName()
      } catch (error) {
        console.error(error)
      }
    },

    listenForNetworkChange () : void {
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    },

    listenForAccountChange () : void {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        this.setAddress(accounts[0])
        if (!this.address) this.disconnect()
      })
    },

    listenForConnection () : void {
      window.ethereum.on('connect', (connectInfo: ConnectInfo) => {
        console.log(connectInfo)
      })
    },

    listenForDisconnection () : void {
      window.ethereum.on('disconnect', () => {
        console.log('disconnected')
      })
    },

    addWalletConnectListeners () {
      try {
        this.walletConnect.connector.on('connect', (error, payload) => {
          if (error) throw error
          const { accounts } = payload.params[0]
          this.setAddress(accounts[0])
          this.closeDialog()
        })

        this.walletConnect.connector.on('session_update', (error, payload) => {
          if (error) throw error
          const { accounts } = payload.params[0]
          this.address = accounts[0]
        })

        this.walletConnect.connector.on('disconnect', error => {
          if (error) throw error
          this.disconnect()
        })
      } catch (error) {
        this.error = error.message
      }
    },

    disconnect () : void {
      this.setAddress('')
      this.setEnsName('')
      this.setSigner(undefined)
      this.setProvider(undefined)
      this.walletConnect.connector.killSession()
    },

    closeDialog () : void {
      this.error = ''
      this.setShowDialog(false)
    }
  }
})
</script>
