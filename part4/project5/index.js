if (typeof web3 != "undefined") {
  web3 = new Web3(web3.currentProvider); // what Metamask injected
} else {
  // Instantiate and set Ganache as your provider
  web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/8f06b06788e046f9ba989b606c0574f1"
    )
  );
}

// The default (top) wallet account from a list of test accounts
web3.eth.defaultAccount = web3.eth.accounts[0];

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

// Get and display star name
starNotary.starName(function(error, result) {
  if (!error) {
    document.getElementById("star-name").innerText = result;
  } else {
    console.log(error);
  }
});

// Get and display star owner
starNotary.starOwner(function(error, result) {
  if (!error) {
    document.getElementById("star-owner").innerText = result;
  } else {
    console.log(error);
  }
});

// Enable claim button being clicked
function claimButtonClicked() {
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
      return;
    }
    var account = accounts[0];
    starNotary.claimStar(function(error, result) {
      if (!error) {
        var starClaimedEvent = starNotary.starClaimed({ from: account });
        starClaimedEvent.watch(function(error, result) {
          if (!error) {
            location.reload();
          } else {
            console.log("watching for star claimed event is failing");
          }
        });
      } else {
        console.log(error);
      }
    });
  });
}
