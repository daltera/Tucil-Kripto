import React from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cipher: 'Vigenere',
      plainText:'',
      key:'',
      encryptedText:'',
      decryptedText:'',
      encryptionMode:true
    }
  }
  encryptionType = [
    {
      value:'Vigenere',
      label:'Vigenere'
    },
    {
      value:'Full Vigenere',
      label:'Full Vigenere'
    },
    {
      value:'Auto Key Vigenere',
      label:'Auto Key Vigenere'
    },
    {
      value:'Extended Vigenere',
      label:'Extended Vigenere'
    },
    {
      value:'Playfair',
      label:'Playfair'
    },
    {
      value:'Super',
      label:'Super'
    },
    {
      value:'Affine',
      label:'Affine'
    },
    {
      value:'Hill',
      label:'Hill'
    }
  ]

  handleEncryptionTypeChange = (event) => {
    console.log(event.target)
    console.log(this.state.cipher)
    this.setState({
      cipher:event.target.value
    })
  }

  handleModeChange = (event) => {
    this.setState({
      encryptionMode:!this.state.encryptionMode,
      encryptedText:'',
      decryptedText:'',
      plainText:'',
      key:''
    })
  }

  handlePlainChange = event => {
    this.setState({
      plainText:event.target.value
    })
  }

  handleEncryptedChange = event => {
    this.setState({
      encryptedText:event.target.value
    })
  }
  
  handleKeyChange = event => {
    this.setState({
      key:event.target.value
    })
  }

  encrypt = () => {
    const { cipher, key, plainText } = this.state
    let tempKey
    let temp
    switch(cipher) {
      case 'Vigenere':
        temp = plainText.replace(/ /g,'').trim().toUpperCase().split('')
        console.log(temp)
        tempKey = key.toUpperCase().trim()
        for (let i = 0; i < temp.length; i++){
          temp[i] = String.fromCharCode((((temp[i].charCodeAt(0) - 65) + (tempKey[i % tempKey.length].charCodeAt(0) - 65)) % 26) + 65) 
        }
        temp = temp.join('')
        this.setState({
          encryptedText: temp
        })
        break
      case 'Full Vigenere':
        
        break
      case 'Auto Key Vigenere':
        temp = plainText.replace(/ /g,'').trim().toUpperCase().split('')
        tempKey = key.replace(/ /g,'').concat(plainText.substr(0,(temp.length-key.length)-1))
        console.log(temp)
        for (let i = 0; i < temp.length; i++){
          temp[i] = String.fromCharCode((((temp[i].charCodeAt(0) - 65) + (tempKey[i % tempKey.length].charCodeAt(0) - 65)) % 26) + 65) 
        }
        temp = temp.join('')
        this.setState({
          encryptedText: temp,
          key:tempKey
        })
        break
      case 'Extended Vigenere':
        temp = plainText.replace(/ /g,'').trim().toUpperCase().split('')
        console.log(temp)
        tempKey = key.toUpperCase().trim()
        for (let i = 0; i < temp.length; i++){
          temp[i] = String.fromCharCode((((temp[i].charCodeAt(0)) + (tempKey[i % tempKey.length].charCodeAt(0))) % 256)) 
          console.log(temp[i].charCodeAt(0))
          console.log("---------------------------")
          console.log((((temp[i].charCodeAt(0)) + (tempKey[i % tempKey.length].charCodeAt(0))) % 256))
        }
        temp = temp.join('')
        console.log(temp)
        this.setState({
          encryptedText: temp
        })
        break
      case 'Playfair':
    
        break
      case 'Super':
  
        break
      case 'Affine':
        break
      case 'Hill':
        break    
      default:
        console.log("Error!")
        break
    }
  }
  decrypt = () => {
    const { cipher, key, encryptedText } = this.state
    let temp, tempKey
    switch(cipher) {
      case 'Vigenere':
        temp = encryptedText.toUpperCase().trim().split('')
        tempKey = key.toUpperCase().trim()
        for (let i = 0; i < temp.length; i++){
          temp[i] = String.fromCharCode((((((temp[i].charCodeAt(0) - 65) - (tempKey[i % tempKey.length].charCodeAt(0) - 65)) % 26) + 26) % 26) + 65) 
          console.log(((temp[i].charCodeAt(0) - 65) - (tempKey[i % tempKey.length].charCodeAt(0) - 65)))
        }
        
        temp = temp.join('')
        console.log(temp)
        this.setState({
          decryptedText: temp
        })
        break
      case 'Full Vigenere':

        break
      case 'Auto Key Vigenere':
        temp = encryptedText.toUpperCase().trim().split('')
        tempKey = key.toUpperCase().trim()
        for (let i = 0; i < temp.length; i++){
          temp[i] = String.fromCharCode((((((temp[i].charCodeAt(0) - 65) - (tempKey[i % tempKey.length].charCodeAt(0) - 65)) % 26) + 26) % 26) + 65) 
          console.log(((temp[i].charCodeAt(0) - 65) - (tempKey[i % tempKey.length].charCodeAt(0) - 65)))
        }
        
        temp = temp.join('')
        console.log(temp)
        this.setState({
          decryptedText: temp
        })
        break
      case 'Extended Vigenere':
        temp = encryptedText.replace(/ /g,'').trim().toUpperCase().split('')
        console.log(temp)
        tempKey = key.toUpperCase().trim()
        for (let i = 0; i < temp.length; i++){
          temp[i] = String.fromCharCode(((((temp[i].charCodeAt(0)) - (tempKey[i % tempKey.length].charCodeAt(0))) % 256)+256)%256) 
       }
        temp = temp.join('')
        console.log(temp)
        this.setState({
          decryptedText: temp
        })
        break
      case 'Playfair':
    
        break
      case 'Super':
  
        break
      case 'Affine':
        break
      case 'Hill':
        break   
      default:
        console.log("Error!")
        break
    }
  }

  render(){
    const { cipher, encryptionMode, encryptedText, decryptedText, plainText, key } = this.state

    return(
      <div style={{maxWidth:"1000px", margin:"auto"}}>
        <Grid direction="column" xs={12}>
          <Grid item xs={12} alignContent="flex-end" direction="row">
            <Button onClick={this.handleModeChange}>{encryptionMode ? "ENCRYPT MODE" : "DECRYPT MODE"}</Button>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              select
              label="Select encryption type"
              value={cipher}
              onChange={this.handleEncryptionTypeChange}
              style={{width:"100%"}}
            >
              {this.encryptionType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField onChange={encryptionMode ? this.handlePlainChange : this.handleEncryptedChange} value={encryptionMode ? plainText : encryptedText} style={{width:"100%"}} label={encryptionMode ? "Enter plaintext here..." : "Enter encrypted text here"}></TextField>
          </Grid>
          <Grid item xs={12}>  
            <TextField onChange={this.handleKeyChange} value={key} style={{width:"100%"}} label="Enter key here..."></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField value={encryptionMode ? encryptedText : decryptedText}style={{width:"100%"}} label={encryptionMode ? "Encrypted result..." : "Decryption result..."} disabled></TextField>
          </Grid>
          <Grid itex xs={12}>
            <Button onClick={encryptionMode ? this.encrypt : this.decrypt}>{encryptionMode ? "Encrypt" : "Decrypt"}</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Main