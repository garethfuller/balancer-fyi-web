<template>
  <div>
    <BaseBtn
      :disabled="connecting"
      :loading="connecting"
      loading-label="Connecting"
      block
      flat
      @click="dialog = true"
    >
      <EthAddress v-if="connected" :address="address" :ens-name="ensName" />
      <span v-else>Connect a wallet</span>
    </BaseBtn>
    <WalletDialog
      title="Connect a wallet"
      :show="dialog"
      @close="closeDialog"
      @clicked="connect"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'
import { Web3Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
// import WalletConnect from '@walletconnect/client'
// import QRCodeModal from '@walletconnect/qrcode-modal'
import WalletDialog from '~/components/dialogs/WalletDialog.vue'

interface ConnectInfo {
  chainId: string;
}

export default Vue.extend({
  name: 'AuthBtn',

  components: {
    WalletDialog
  },

  data () {
    return {
      connecting: true,
      dialog: false,
      error: ''
      // walletConnect: {
      //   connector: new WalletConnect({
      //     bridge: 'https://bridge.walletconnect.org',
      //     qrcodeModal: QRCodeModal
      //   })
      // }
    }
  },

  computed: {
    provider (): Web3Provider { return this.$store.state.auth.provider },
    signer (): Signer { return this.$store.state.auth.signer },
    address (): string { return this.$store.state.auth.address },
    ensName (): string { return this.$store.state.auth.ensName },

    hasBrowserProvider (): boolean {
      return typeof window.ethereum !== 'undefined'
    },

    connected (): boolean {
      return !!this.address // || wallet connect is connected
    }
  },

  async mounted () {
    try {
      // if (this.walletConnect.connector.connected) this.walletConnect.connector.killSession()
      // this.addWalletConnectListeners()
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
      this.connecting = false
    }
  },

  // beforeDestroy () {
  //   this.walletConnect.connector.killSession()
  // },

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
      setEnsName: 'auth/setEnsName'
    }),

    connect (wallet: string) : void {
      this.connecting = true
      try {
        switch (wallet) {
          // case 'walletConnect':
          //   this.connectWalletConnect()
          //   break
          default:
            this.connectBrowser()
            break
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.connecting = false
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

    disconnect () : void {
      this.setAddress('')
      this.setEnsName('')
      this.setSigner(undefined)
      this.setProvider(undefined)
      // this.walletConnect.connector.killSession()
    },

    closeDialog () : void {
      this.error = ''
      this.dialog = false
    }
  }
})
</script>
