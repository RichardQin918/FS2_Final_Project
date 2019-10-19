$(document).ready( async function() {
  window.addEventListener('load', async () => {
    
    if (window.ethereum) {
      web3 = new Web3(window.ethereum)
      window.web3 = new Web3(ethereum)
      console.log('detected!')
      try {
        // Request account access if needed
        // await window.ethereum.enable()
        await ethereum.enable()
      }
      catch(error) {
        console.error('enable web3 error')
      }
      console.log(web3.version.network)
      if (web3.version.network !== '3') {
        $('#msg').text('Please switch to ropsten testnet and refresh page!')
        $('#alertModal').modal();
      }
      let nameList = ['Estella', 'Shermeen', 'Richard']
        nameList.forEach(async function(name) {
          let addr = $('#' + name + 'Addr').attr('name')
          web3.eth.getBalance(addr, function(error, balance) {
            if (error) {
              console.error('get balance error: ', error)
            }
            balance = web3.fromWei(balance, "ether") 
            $('#' + name + 'Balance').text(balance.toFixed(2))
            $('#' + name + 'Addr').text(addr.slice(0,6) + '...')
            $('#' + name + 'Addr').on('click', function() {
              $('#msg').text('This is full address: ' + $(this).attr('name'))
              $('#alertModal').modal();
            })
          })
        })
    }
    else {
      $('#msg').text('No web3 connection found Please use metamask !')
      $('#alertModal').modal();
    }

    
  })
});