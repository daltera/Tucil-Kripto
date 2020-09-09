import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import lightmatrix from "lightmatrix";

class Main extends React.Component {
  constructor(props) {
    super(props);
    let alphabet = [];
    for (let i = 0; i < 26; i++) {
      alphabet.push(String.fromCharCode(i + 65));
    }
    this.state = {
      cipher: "Vigenere",
      plainText: "",
      key: "",
      encryptedText: "",
      decryptedText: "",
      alphabetConfig: alphabet,
      encryptionMode: true,
      a: "",
      b: "",
      encryptionMatrix: "",
      decryptionMatrix: "",
      shift: "",
      partition: "",
      uploadedFile: null,
    };
  }

  encryptionType = [
    {
      value: "Vigenere",
      label: "Vigenere",
    },
    {
      value: "Full Vigenere",
      label: "Full Vigenere",
    },
    {
      value: "Auto Key Vigenere",
      label: "Auto Key Vigenere",
    },
    {
      value: "Extended Vigenere",
      label: "Extended Vigenere",
    },
    {
      value: "Playfair",
      label: "Playfair",
    },
    {
      value: "Super",
      label: "Super",
    },
    {
      value: "Affine",
      label: "Affine",
    },
    {
      value: "Hill",
      label: "Hill",
    },
  ];

  handleEncryptionTypeChange = (event) => {
    console.log(event.target);
    console.log(this.state.cipher);
    this.setState({
      cipher: event.target.value,
    });
  };

  handleSeparateClicker = () => {
    const { encryptedText } = this.state;
    let arr = encryptedText.replace(/ /g, "").split("");
    let chunk = 5;
    let newContainer = [];
    let lastidx = 0;
    for (let i = 0; i < arr.length; i += chunk) {
      let tempArray = arr.slice(i, i + chunk);
      console.log(tempArray);
      tempArray = tempArray.join("");
      newContainer.push(tempArray);
      lastidx = i;
    }
    arr = arr.slice(lastidx + chunk).join("");
    newContainer.push(arr);
    // newContainer.join(" ");
    // console.log(newContainer.join(" "));
    this.setState({
      encryptedText: newContainer.join(" "),
    });
  };

  handleUploadFile = async (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      let textRes = e.target.result;
      console.log(textRes);
      if (!this.encryptionMode) {
        this.setState({
          plainText: textRes,
        });
      } else {
        this.setState({
          encryptedText: textRes,
        });
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  handleModeChange = (event) => {
    let alphabet = [];
    for (let i = 0; i < 26; i++) {
      alphabet.push(String.fromCharCode(i + 65));
    }
    this.setState({
      cipher: "Vigenere",
      plainText: "",
      key: "",
      encryptedText: "",
      decryptedText: "",
      alphabetConfig: alphabet,
      encryptionMode: !this.state.encryptionMode,
      a: "",
      b: "",
      encryptionMatrix: "",
      decryptionMatrix: "",
      shift: "",
      partition: "",
      uploadedFile: null,
    });
  };

  handlePlainChange = (event) => {
    this.setState({
      plainText: event.target.value,
    });
  };

  handleEncryptedChange = (event) => {
    this.setState({
      encryptedText: event.target.value,
    });
  };

  handleKeyChange = (event) => {
    this.setState({
      key: event.target.value,
    });
  };

  handleAlphabetConfigChange = (event) => {
    this.setState({
      alphabetConfig: event.target.value,
    });
  };

  handleAChange = (event) => {
    this.setState({
      a: event.target.value,
    });
  };

  handleBChange = (event) => {
    this.setState({
      b: event.target.value,
    });
  };

  handleShiftChange = (event) => {
    this.setState({
      shift: event.target.value,
    });
  };

  handlePartitionChange = (event) => {
    this.setState({
      partition: event.target.value,
    });
  };

  shuffleAlphabetConfig = () => {
    const { alphabetConfig } = this.state;
    let shuffledAlphabet = alphabetConfig.sort(() => Math.random() - 0.5);
    this.setState({
      alphabetConfig: shuffledAlphabet,
    });
  };

  encrypt = () => {
    const { cipher, key, plainText, alphabetConfig } = this.state;
    let tempKey, temp;
    switch (cipher) {
      case "Vigenere":
        temp = plainText.replace(/ /g, "").trim().toUpperCase().split("");
        tempKey = key.toUpperCase().trim();
        for (let i = 0; i < temp.length; i++) {
          temp[i] = String.fromCharCode(
            ((temp[i].charCodeAt(0) -
              65 +
              (tempKey[i % tempKey.length].charCodeAt(0) - 65)) %
              26) +
              65
          );
        }
        temp = temp.join("");
        this.setState({
          encryptedText: temp,
        });
        break;
      case "Full Vigenere":
        console.log(plainText);
        temp = plainText.replace(/ /g, "").trim().toUpperCase().split("");
        tempKey = key.toUpperCase().trim();
        for (let i = 0; i < temp.length; i++) {
          temp[i] =
            alphabetConfig[
              (alphabetConfig.indexOf(temp[i]) +
                alphabetConfig.indexOf(tempKey[i % tempKey.length])) %
                26
            ];
        }
        temp = temp.join("");
        this.setState({
          encryptedText: temp,
        });
        break;
      case "Auto Key Vigenere":
        temp = plainText.replace(/ /g, "").trim().toUpperCase().split("");
        tempKey = key
          .replace(/ /g, "")
          .trim()
          .concat(plainText.substr(0, temp.length - key.length))
          .toUpperCase();
        for (let i = 0; i < temp.length; i++) {
          temp[i] = String.fromCharCode(
            ((temp[i].charCodeAt(0) - 65 + (tempKey[i].charCodeAt(0) - 65)) %
              26) +
              65
          );
        }
        temp = temp.join("");
        this.setState({
          encryptedText: temp,
          key: tempKey,
        });
        break;
      case "Extended Vigenere":
        temp = plainText.replace(/ /g, "").trim().split("");
        tempKey = key.trim().replace(/ /g, "");
        for (let i = 0; i < temp.length; i++) {
          temp[i] = String.fromCharCode(
            (temp[i].charCodeAt(0) +
              tempKey[i % tempKey.length].charCodeAt(0)) %
              256
          );
        }
        temp = temp.join("");
        this.setState({
          encryptedText: temp,
        });
        break;
      case "Playfair":
        let alphabet = [];
        for (let i = 0; i < 26; i++) {
          alphabet.push(String.fromCharCode(i + 65));
        }

        temp = plainText
          .replace(/ /g, "")
          .trim()
          .toUpperCase()
          .replace(/J/g, "I")
          .split("");
        console.log("Temp: ", temp);

        //5x5 Table as single dimension array
        // div as row, mod as column
        tempKey = key
          .trim()
          .toUpperCase()
          .split("")
          .concat(alphabet)
          .filter(function (item, i, ar) {
            return ar.indexOf(item) === i;
          })
          .filter(function (e) {
            return e !== "J";
          });
        console.log("TempKey: ", tempKey);

        //Create 5x5 key table
        let keyMatrix = [
          ["A", "A", "A", "A", "A"],
          ["A", "A", "A", "A", "A"],
          ["A", "A", "A", "A", "A"],
          ["A", "A", "A", "A", "A"],
          ["A", "A", "A", "A", "A"],
        ];

        let iter = 0;
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            keyMatrix[i][j] = tempKey[iter];
            iter++;
          }
        }
        console.log("keyMatrix: ", keyMatrix);

        iter = 0;
        let firstIDX = 0;
        let secondIDX = 0;
        let cipherText = "";

        while (iter < temp.length) {
          //Getting the tuple
          firstIDX = tempKey.indexOf(temp[iter]);
          if (temp[iter + 1]) {
            secondIDX = tempKey.indexOf(temp[iter + 1]);
          } else {
            secondIDX = tempKey.indexOf("X");
          }

          let cipher1 = "";
          let cipher2 = "";
          if (Math.floor(firstIDX / 5) === Math.floor(secondIDX / 5)) {
            cipher1 =
              keyMatrix[Math.floor(firstIDX / 5)][((firstIDX % 5) + 1) % 5];
            cipher2 =
              keyMatrix[Math.floor(secondIDX / 5)][((secondIDX % 5) + 1) % 5];
          } else if (firstIDX % 5 === secondIDX % 5) {
            cipher1 = keyMatrix[Math.floor(firstIDX / 5 + 1) % 5][firstIDX % 5];
            cipher2 =
              keyMatrix[Math.floor(secondIDX / 5 + 1) % 5][secondIDX % 5];
          } else {
            cipher1 = keyMatrix[Math.floor(firstIDX / 5)][secondIDX % 5];
            cipher2 = keyMatrix[Math.floor(secondIDX / 5)][firstIDX % 5];
          }

          cipherText = cipherText.concat(cipher1);
          cipherText = cipherText.concat(cipher2);

          iter = iter + +2;
        }
        console.log("Cipher Text: ", cipherText);
        this.setState({
          encryptedText: cipherText,
        });
        break;
      case "Super":
        const { shift, partition } = this.state;
        temp = plainText.replace(/ /g, "").trim().toUpperCase().split("");
        tempKey = key.toUpperCase().trim();
        for (let i = 0; i < temp.length; i++) {
          temp[i] = String.fromCharCode(
            ((temp[i].charCodeAt(0) - 65 + parseInt(shift)) % 26) + 65
          );
        }
        console.log(temp);
        let temporaryContainer = [];
        const rowNumber = Math.ceil(temp.length / partition);
        for (let i = 0; i < rowNumber; i++) {
          temporaryContainer.push([]);
        }
        let j = 0;
        for (let i = 0; i < temp.length; i++) {
          console.log(temporaryContainer[j].length);
          if (temporaryContainer[j].length === parseInt(partition)) {
            j++;
          }
          temporaryContainer[j].push(temp[i]);
        }
        console.log(temporaryContainer);
        let k = 0;
        for (let j = 0; j < parseInt(partition); j++) {
          for (let i = 0; i < rowNumber; i++) {
            console.log(temporaryContainer[i][j]);
            if (temporaryContainer[i][j] !== undefined) {
              temp[k] = temporaryContainer[i][j];
              k++;
            }
            if (k === temp.length) {
              break;
            }
          }
          if (k === temp.length) {
            break;
          }
        }
        temp = temp.join("");
        this.setState({
          encryptedText: temp,
        });
        break;
      case "Affine":
        const { a, b } = this.state;
        if (
          parseInt(a) % 2 === 0 ||
          parseInt(a) % 13 === 0 ||
          parseInt(a) % 26 === 0
        ) {
          console.log("Invalid number!");
        } else {
          temp = plainText.replace(/ /g, "").trim().toUpperCase().split("");
          for (let i = 0; i < temp.length; i++) {
            temp[i] = String.fromCharCode(
              (((temp[i].charCodeAt(0) - 65) * parseInt(a) + parseInt(b)) %
                26) +
                65
            );
          }
          temp = temp.join("");
          this.setState({
            encryptedText: temp,
          });
        }
        break;
      case "Hill":
        // const lightmatrix = require("lightmatrix");

        if (key.length === 9) {
          temp = plainText.replace(/ /g, "").toUpperCase().trim().split("");
          tempKey = key.trim().replace(/ /g, "").toUpperCase().trim().split("");

          let matrixKey = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ];
          //k = iterator tempKey
          let k = 0;
          let alphabet = [];
          for (let i = 0; i < 26; i++) {
            alphabet.push(String.fromCharCode(i + 65));
          }

          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              // matrixKey.set(i, j, alphabet.indexOf(tempKey[k]));
              matrixKey[i][j] = alphabet.indexOf(tempKey[k]);
              k++;
            }
          }

          let det = ((lightmatrix.determinant(matrixKey) % 26) + 26) % 26;
          let invdet = modInverse(det, 26);

          // console.log(lightmatrix.determinant(matrixKey));
          if (!invdet) {
            console.log("Key invalid");
            break;
          }

          let multiplierMatrix = [[0], [0], [0]];

          console.log("Key Matrix: ", matrixKey);
          // k = iterator plaintext
          k = 0;
          let cipherText = "";
          // let over2 = 0;
          // let over1 = 0;
          while (k < temp.length) {
            // over2 = 0;
            // over1 = 0;
            if (temp[k]) {
              // multiplierMatrix.set(0, 0, alphabet.indexOf(temp[k]));
              multiplierMatrix[0][0] = alphabet.indexOf(temp[k]);
            }
            if (temp[k + 1]) {
              //   // multiplierMatrix.set(1, 0, alphabet.indexOf(temp[k + 1]));
              multiplierMatrix[1][0] = alphabet.indexOf(temp[k + 1]);
            } else {
              // multiplierMatrix.set(1, 0, 25);
              multiplierMatrix[1][0] = 25;
              // over2 = 1;
            }
            if (temp[k + 2]) {
              // multiplierMatrix.set(2, 0, alphabet.indexOf(temp[k + 2]));
              multiplierMatrix[2][0] = alphabet.indexOf(temp[k + 2]);
            } else {
              // multiplierMatrix.set(2, 0, 25);
              multiplierMatrix[2][0] = 25;
              // over1 = 1;
            }

            // let matrixCipher = Matrix.mod(matrixKey.mmul(multiplierMatrix), 26);
            let matrixCipher = lightmatrix.product(matrixKey, multiplierMatrix);

            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                matrixCipher[i][j] = matrixCipher[i][j] % 26;
              }
            }

            console.log("Text Matrix: ", multiplierMatrix);
            console.log("Ciphertext Matrix: ", matrixCipher);

            // if (!over1 && !over2) {
            cipherText = cipherText.concat(alphabet[matrixCipher[0][0]]);
            cipherText = cipherText.concat(alphabet[matrixCipher[1][0]]);
            cipherText = cipherText.concat(alphabet[matrixCipher[2][0]]);
            // } else if (over1 && !over2) {
            //   cipherText = cipherText.concat(alphabet[matrixCipher[0][0]]);
            //   cipherText = cipherText.concat(alphabet[matrixCipher[1][0]]);
            // } else if (over1 && over2) {
            //   cipherText = cipherText.concat(alphabet[matrixCipher[0][0]]);
            // }

            k = k + 3;
          }

          console.log("Ciphertext: ", cipherText);

          this.setState({
            encryptedText: cipherText,
          });
        } else {
          console.log("Error! Key not 9 digit");
        }
        break;
      default:
        console.log("Error!");
        break;
    }
  };

  decrypt = () => {
    const { cipher, key, encryptedText, alphabetConfig } = this.state;
    let temp, tempKey;
    switch (cipher) {
      case "Vigenere":
        temp = encryptedText.toUpperCase().trim().split("");
        tempKey = key.toUpperCase().trim();
        for (let i = 0; i < temp.length; i++) {
          temp[i] = String.fromCharCode(
            ((((temp[i].charCodeAt(0) -
              65 -
              (tempKey[i % tempKey.length].charCodeAt(0) - 65)) %
              26) +
              26) %
              26) +
              65
          );
          console.log(
            temp[i].charCodeAt(0) -
              65 -
              (tempKey[i % tempKey.length].charCodeAt(0) - 65)
          );
        }

        temp = temp.join("");
        console.log(temp);
        this.setState({
          decryptedText: temp,
        });
        break;
      case "Full Vigenere":
        temp = encryptedText.replace(/ /g, "").trim().toUpperCase().split("");
        tempKey = key.toUpperCase().trim();
        for (let i = 0; i < temp.length; i++) {
          temp[i] =
            alphabetConfig[
              (((alphabetConfig.indexOf(temp[i]) -
                alphabetConfig.indexOf(tempKey[i % tempKey.length])) %
                26) +
                26) %
                26
            ];
        }
        temp = temp.join("");
        this.setState({
          decryptedText: temp,
        });
        break;
      case "Auto Key Vigenere":
        temp = encryptedText.toUpperCase().trim().split("");
        tempKey = key.toUpperCase().trim();
        for (let i = 0; i < temp.length; i++) {
          temp[i] = String.fromCharCode(
            ((((temp[i].charCodeAt(0) -
              65 -
              (tempKey[i % tempKey.length].charCodeAt(0) - 65)) %
              26) +
              26) %
              26) +
              65
          );
          console.log(
            temp[i].charCodeAt(0) -
              65 -
              (tempKey[i % tempKey.length].charCodeAt(0) - 65)
          );
        }

        temp = temp.join("");
        console.log(temp);
        this.setState({
          decryptedText: temp,
        });
        break;
      case "Extended Vigenere":
        temp = encryptedText.replace(/ /g, "").trim().split("");
        console.log(temp);
        tempKey = key.trim().replace(/ /g, "");
        for (let i = 0; i < temp.length; i++) {
          temp[i] = String.fromCharCode(
            (((temp[i].charCodeAt(0) -
              tempKey[i % tempKey.length].charCodeAt(0)) %
              256) +
              256) %
              256
          );
        }
        temp = temp.join("");
        console.log(temp);
        this.setState({
          decryptedText: temp,
        });
        break;
      case "Playfair":
        let alphabet = [];
        for (let i = 0; i < 26; i++) {
          alphabet.push(String.fromCharCode(i + 65));
        }

        temp = encryptedText
          .replace(/ /g, "")
          .trim()
          .toUpperCase()
          .replace(/J/g, "I")
          .split("");
        console.log("Temp: ", temp);

        //5x5 Table as single dimension array
        // div as row, mod as column
        tempKey = key
          .trim()
          .toUpperCase()
          .split("")
          .concat(alphabet)
          .filter(function (item, i, ar) {
            return ar.indexOf(item) === i;
          })
          .filter(function (e) {
            return e !== "J";
          });
        console.log("TempKey: ", tempKey);

        //Create 5x5 key table
        let keyMatrix = [
          ["A", "A", "A", "A", "A"],
          ["A", "A", "A", "A", "A"],
          ["A", "A", "A", "A", "A"],
          ["A", "A", "A", "A", "A"],
          ["A", "A", "A", "A", "A"],
        ];

        let iter = 0;
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            keyMatrix[i][j] = tempKey[iter];
            iter++;
          }
        }
        console.log("keyMatrix: ", keyMatrix);

        iter = 0;
        let firstIDX = 0;
        let secondIDX = 0;
        let cipherText = "";

        while (iter < temp.length) {
          //Getting the tuple
          firstIDX = tempKey.indexOf(temp[iter]);
          if (temp[iter + 1]) {
            secondIDX = tempKey.indexOf(temp[iter + 1]);
          } else {
            secondIDX = tempKey.indexOf("X");
          }

          let cipher1 = "";
          let cipher2 = "";
          if (Math.floor(firstIDX / 5) === Math.floor(secondIDX / 5)) {
            cipher1 =
              keyMatrix[Math.floor(firstIDX / 5)][((firstIDX % 5) + 4) % 5];
            cipher2 =
              keyMatrix[Math.floor(secondIDX / 5)][((secondIDX % 5) + 4) % 5];
          } else if (firstIDX % 5 === secondIDX % 5) {
            cipher1 = keyMatrix[Math.floor(firstIDX / 5 + 4) % 5][firstIDX % 5];
            cipher2 =
              keyMatrix[Math.floor(secondIDX / 5 + 4) % 5][secondIDX % 5];
          } else {
            cipher1 = keyMatrix[Math.floor(firstIDX / 5)][secondIDX % 5];
            cipher2 = keyMatrix[Math.floor(secondIDX / 5)][firstIDX % 5];
          }

          cipherText = cipherText.concat(cipher1);
          cipherText = cipherText.concat(cipher2);

          iter = iter + +2;
        }
        console.log("Cipher Text: ", cipherText);
        this.setState({
          decryptedText: cipherText,
        });
        break;
      case "Super":
        const { partition, shift } = this.state;
        temp = encryptedText.replace(/ /g, "").trim().toUpperCase().split("");
        let rowNumber = Math.ceil(encryptedText.length / partition);
        let temporaryContainer = [];
        for (let i = 0; i < rowNumber; i++) {
          temporaryContainer.push([]);
        }
        let i = 0;
        for (let j = 0; j < temp.length; j++) {
          temporaryContainer[i].push(temp[j]);
          i++;
          if (i === rowNumber) {
            i = 0;
          }
        }

        for (let i = 0; i < rowNumber - 1; i++) {
          if (temporaryContainer[i].length < parseInt(partition)) {
            temporaryContainer[i].push(
              temporaryContainer[rowNumber - 1][
                temporaryContainer[rowNumber - 1].length - 1
              ]
            );
            delete temporaryContainer[rowNumber - 1][
              temporaryContainer[rowNumber - 1].length - 1
            ];
          }
        }

        console.log(temporaryContainer);
        let newTemp = [];
        for (let i = 0; i < rowNumber; i++) {
          for (let j = 0; j < parseInt(partition); j++) {
            if (temporaryContainer[i][j] !== undefined) {
              newTemp.push(temporaryContainer[i][j]);
            }
          }
        }

        for (let i = 0; i < newTemp.length; i++) {
          console.log(newTemp);
          newTemp[i] = String.fromCharCode(
            ((((newTemp[i].charCodeAt(0) - 65 - parseInt(shift)) % 26) + 26) %
              26) +
              65
          );
        }

        newTemp = newTemp.join("");
        console.log(newTemp);
        this.setState({
          decryptedText: newTemp,
        });

        break;
      case "Affine":
        const { a, b } = this.state;
        if (
          parseInt(a) % 2 === 0 ||
          parseInt(a) % 13 === 0 ||
          parseInt(a) % 26 === 0
        ) {
          console.log("Invalid number!");
        } else {
          let inverseModulo = 2;
          while ((inverseModulo * a) % 26 !== 1) {
            inverseModulo++;
          }
          temp = encryptedText.replace(/ /g, "").trim().toUpperCase().split("");
          for (let i = 0; i < temp.length; i++) {
            temp[i] = String.fromCharCode(
              (((((temp[i].charCodeAt(0) - 65 - parseInt(b)) *
                parseInt(inverseModulo)) %
                26) +
                26) %
                26) +
                65
            );
          }
          temp = temp.join("");
          this.setState({
            decryptedText: temp,
          });
        }
        break;
      case "Hill":
        if (key.length === 9) {
          temp = encryptedText.replace(/ /g, "").toUpperCase().trim().split("");
          tempKey = key.trim().replace(/ /g, "").toUpperCase().trim().split("");

          let matrixKey = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ];

          //set alphabet
          let alphabet = [];
          for (let i = 0; i < 26; i++) {
            alphabet.push(String.fromCharCode(i + 65));
          }

          //k = iterator tempKey
          let k = 0;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              matrixKey[i][j] = alphabet.indexOf(tempKey[k]);
              k++;
            }
          }

          let det = ((lightmatrix.determinant(matrixKey) % 26) + 26) % 26;
          let invdet = modInverse(det, 26);

          // console.log(lightmatrix.determinant(matrixKey));
          if (!invdet) {
            console.log("Key invalid");
            break;
          }

          let adjMatrixKey = lightmatrix.adjoint(matrixKey);

          let matrixDecryptKey = lightmatrix.multiply(invdet, adjMatrixKey);

          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              matrixDecryptKey[i][j] =
                ((matrixDecryptKey[i][j] % 26) + 26) % 26;
            }
          }

          console.log("Inv Key Matrix: ", matrixDecryptKey);

          let multiplierMatrix = [[0], [0], [0]];

          console.log("Key Matrix: ", matrixKey);
          // k = iterator plaintext
          k = 0;
          let cipherText = "";
          // let over2 = 0;
          // let over1 = 0;
          while (k < temp.length) {
            // over2 = 0;
            // over1 = 0;
            if (temp[k]) {
              // multiplierMatrix.set(0, 0, alphabet.indexOf(temp[k]));
              multiplierMatrix[0][0] = alphabet.indexOf(temp[k]);
            }
            if (temp[k + 1]) {
              // multiplierMatrix.set(1, 0, alphabet.indexOf(temp[k + 1]));
              multiplierMatrix[1][0] = alphabet.indexOf(temp[k + 1]);
            } else {
              //   // multiplierMatrix.set(1, 0, 25);
              multiplierMatrix[1][0] = 25;
              //   over2 = 1;
            }
            if (temp[k + 2]) {
              // multiplierMatrix.set(2, 0, alphabet.indexOf(temp[k + 2]));
              multiplierMatrix[2][0] = alphabet.indexOf(temp[k + 2]);
            } else {
              //   // multiplierMatrix.set(2, 0, 25);
              multiplierMatrix[2][0] = 25;
              //   over1 = 1;
            }
            // // console.log(multiplierMatrix)
            // let matrixCipher = Matrix.mod(matrixKey.mmul(multiplierMatrix), 26);
            let matrixDecipher = lightmatrix.product(
              matrixDecryptKey,
              multiplierMatrix
            );

            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                matrixDecipher[i][j] = ((matrixDecipher[i][j] % 26) + 26) % 26;
              }
            }

            console.log("Text Matrix: ", multiplierMatrix);
            console.log("Ciphertext Matrix: ", matrixDecipher);

            // if (!over1 && !over2) {
            cipherText = cipherText.concat(alphabet[matrixDecipher[0][0]]);
            cipherText = cipherText.concat(alphabet[matrixDecipher[1][0]]);
            cipherText = cipherText.concat(alphabet[matrixDecipher[2][0]]);
            // } else if (over1 && !over2) {
            //   cipherText = cipherText.concat(alphabet[matrixDecipher[0][0]]);
            //   cipherText = cipherText.concat(alphabet[matrixDecipher[1][0]]);
            // } else if (over1 && over2) {
            //   cipherText = cipherText.concat(alphabet[matrixDecipher[0][0]]);
            // }

            k = k + 3;
          }

          console.log("Ciphertext: ", cipherText);

          this.setState({
            decryptedText: cipherText,
          });
        } else {
          console.log("Error! Key not 9 digit");
        }
        break;
      default:
        console.log("Error!");
        break;
    }
  };

  AlphabetConfig = () => {
    const { alphabetConfig, cipher } = this.state;
    const config = alphabetConfig.join("");
    return cipher === "Full Vigenere" ? (
      <Grid container direction="row">
        <TextField
          style={{ width: "75%" }}
          label="Alphabet configuration..."
          value={config}
          onChange={this.handleAlphabetConfigChange}
        ></TextField>
        <Button onClick={this.shuffleAlphabetConfig}>Randomize</Button>
      </Grid>
    ) : null;
  };

  AffineUtils = () => {
    const { b, a, cipher } = this.state;
    return cipher === "Affine" ? (
      <Grid container direction="row">
        <TextField
          style={{ width: "75%" }}
          label="Enter your a..."
          value={a}
          onChange={this.handleAChange}
        ></TextField>
        <TextField
          style={{ width: "75%" }}
          label="Enter your shift"
          value={b}
          onChange={this.handleBChange}
        ></TextField>
      </Grid>
    ) : null;
  };

  SuperUtils = () => {
    const { shift, partition, cipher } = this.state;
    return cipher === "Super" ? (
      <Grid container direction="row">
        <TextField
          style={{ width: "75%" }}
          onChange={this.handleShiftChange}
          label="Enter your shift..."
          value={shift}
        ></TextField>
        <TextField
          style={{ width: "75%" }}
          onChange={this.handlePartitionChange}
          label="Enter your partition..."
          value={partition}
        ></TextField>
      </Grid>
    ) : null;
  };

  render() {
    const {
      cipher,
      encryptionMode,
      encryptedText,
      decryptedText,
      plainText,
      key,
    } = this.state;

    return (
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <Grid direction="column" xs={12}>
          <Grid item xs={12} alignContent="flex-end" direction="row">
            <Button onClick={this.handleModeChange}>
              {encryptionMode ? "ENCRYPT MODE" : "DECRYPT MODE"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Select encryption type"
              value={cipher}
              onChange={this.handleEncryptionTypeChange}
              style={{ width: "100%" }}
            >
              {this.encryptionType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <input
              type="file"
              id="text"
              className="file"
              onChange={this.handleUploadFile}
            ></input>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={
                encryptionMode
                  ? this.handlePlainChange
                  : this.handleEncryptedChange
              }
              value={encryptionMode ? plainText : encryptedText}
              style={{ width: "100%" }}
              label={
                encryptionMode
                  ? "Enter plaintext here..."
                  : "Enter encrypted text here"
              }
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <this.AlphabetConfig />
            <this.AffineUtils />
            <this.SuperUtils />
          </Grid>
          <Grid item xs={12}>
            {cipher !== "Affine" && cipher !== "Super" ? (
              <TextField
                onChange={this.handleKeyChange}
                value={key}
                style={{ width: "100%" }}
                label="Enter key here..."
              ></TextField>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={encryptionMode ? encryptedText : decryptedText}
              style={{ width: "100%" }}
              label={
                encryptionMode ? "Encrypted result..." : "Decryption result..."
              }
              disabled
            ></TextField>
          </Grid>
          <Grid item container xs={12} direction="row">
            <Button onClick={encryptionMode ? this.encrypt : this.decrypt}>
              {encryptionMode ? "Encrypt" : "Decrypt"}
            </Button>
            <Button onClick={this.handleSeparateClicker}>
              Split 5 Ciphertext
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function modInverse(a, m) {
  // validate inputs
  [a, m] = [Number(a), Number(m)];
  if (Number.isNaN(a) || Number.isNaN(m)) {
    return NaN; // invalid input
  }
  a = ((a % m) + m) % m;
  if (!a || m < 2) {
    return NaN; // invalid input
  }
  // find the gcd
  const s = [];
  let b = m;
  while (b) {
    [a, b] = [b, a % b];
    s.push({ a, b });
  }
  if (a !== 1) {
    return NaN; // inverse does not exists
  }
  // find the inverse
  let x = 1;
  let y = 0;
  for (let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)];
  }
  return ((y % m) + m) % m;
}

export default Main;
