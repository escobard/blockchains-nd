if (typeof web3 != "undefined") {
  web3 = new Web3(web3.currentProvider); // what Metamask injected
} else {
  // Instantiate and set Infura as provider
  web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/8f06b06788e046f9ba989b606c0574f1"
    )
  );
}

// The interface definition for your smart contract (the ABI)
var StarNotary = web3.eth.contract([
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_owner",
        type: "address"
      },
      {
        indexed: true,
        name: "_operator",
        type: "address"
      },
      {
        indexed: false,
        name: "_approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_approved",
        type: "address"
      },
      {
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "buyStar",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "story",
        type: "string"
      },
      {
        name: "dec",
        type: "string"
      },
      {
        name: "mag",
        type: "string"
      },
      {
        name: "cent",
        type: "string"
      },
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "createStar",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_tokenId",
        type: "uint256"
      },
      {
        name: "_price",
        type: "uint256"
      }
    ],
    name: "putStarUpForSale",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_from",
        type: "address"
      },
      {
        indexed: true,
        name: "_to",
        type: "address"
      },
      {
        indexed: true,
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_operator",
        type: "address"
      },
      {
        name: "_approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_owner",
        type: "address"
      },
      {
        indexed: true,
        name: "_approved",
        type: "address"
      },
      {
        indexed: true,
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "coordsString",
        type: "string"
      }
    ],
    name: "checkIfStarExists",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "getApproved",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      },
      {
        name: "_operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "ownerOf",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "starsForSale",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "tokenIdToStarInfo",
    outputs: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "story",
        type: "string"
      },
      {
        name: "coordsString",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
]);
// Grab the contract at specified deployed address with the interface defined by the ABI
var starNotary = StarNotary.at("0xd7bd75459e31151ab54164a6fa1cd8729c8f26be");

// creates a new star, returns star value after function is done
const newStar = async (name, story, dec, mag, cent, tokenId) => {
  // creates star with the provided name, and tokenId, from the first account.
  await starNotary.createStar(name, story, dec, mag, cent, tokenId, {
    from: "0xf5c1908963d040c7d96520874ff4a8e0a11e9673"
  }, function(error, result) {
    if (!error) {
      console.log(result);
      return result;
    } else {
      console.log(error);
    }
  });
};

// returns the meta values of the star
const tokenIdToStarInfo = async e => {
  e.preventDefault();
  await starNotary
    .tokenIdToStarInfo()
    .call(12, {
      from: "0xf5c1908963d040c7d96520874ff4a8e0a11e9673"
    }, function(error, result) {
      if (!error) {
        console.log(result);
        return result;
      } else {
        console.log(error);
      }
    });
};

// handles the creation of a new star
async function handleNewStar(e) {
  e.preventDefault();
  /*
  let name = document.getElementById('name').value,
  story = document.getElementById('story').value,
  dec = document.getElementById('dec').value,
  mag = document.getElementById('mag').value,
  cent = document.getElementById('cent').value,
  tokenId = document.getElementById('tokenId').value;
  */
  let name = "New star",
    story = "Amazing demo star story, building this project was fun",
    dec = "dec_121.874",
    mag = "mag_245.978",
    cent = "dec_121.874",
    tokenId = 1;
  // creates the star, returns the values of the tokens

  let starResult = await newStar(name, story, dec, mag, cent, tokenId);
  console.log(starResult);
}

document
  .getElementById("newStar")
  .addEventListener("submit", handleNewStar, false);