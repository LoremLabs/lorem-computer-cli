# lorem-computer

> Lorem: Distributed Computing CLI

![Alt text](/lorem-computer-logo.png?raw=true "Tx Chris Adams")

# Install CLI Tool

The `lorem` command line tool can be installed with:

```
% npm install -g lorem-computer
```

Once installed you can play with the echo service:

```
% lorem run echo --hello world
```

Feel free to try other things, like:

```
% echo "hello world" | lorem echo winning --web3 
```

## Archival Commands

```
% lorem run preserve-url --url=https://www.mozilla.org/ 
% lorem run retrieve-url --url https://www.mozilla.org/ --unlock 
```

## NFTPort

```
% lorem run nftport get --transaction="0xbcaf36baa3e3cb7273b2bb5b9b19ed27392f27f89855920b839aaf79603e44fe" --chain=rinkeby

% lorem run nftport create --chain=rinkeby --wallet=0xBBxx --name="NFT demo memento" --description="Jam3 memento" --url="https://gateway.pinata.cloud/ipfs/bafybeiesbfcg4xcskww7fh7p2md6pwlbews5wqozifhzrgblxzxcwylssi/screenshot-1920.png"

```

## Covalent

```
% lorem run covalent --tickerSymbol ETH
```

Grab a price, feed it into something else:

```
% lorem run covalent --tickerSymbol ETH >>prices.log
```

## Adding Commands

You can add your own commands with

```
% lorem cmd create echo2 --description="desc" --endpoint="https://api.endpoint/here" --contact="@me on github" > echo2.json

% lorem cmd create --createFile="./echo2.json" --name="echo2"      
```

When commands are added you receive a message like:

```
Command successfully uploaded to IPFS.

         CID: 'bafybeidnzaetgmbpim53wbrkuod6c575bagobhwb6shc75gq37oyeuml4e

 For this command to be picked up, you need to add it to a mapping service.

   covalent: /ipfs/bafybeidnzaetgmbpim53wbrkuod6c575bagobhwb6shc75gq37oyeuml4e
```

You can submit a [Pull Request to add new DNS mappings](https://github.com/LoremLabs/lorem-computer-hackathon/blob/main/services/lorem-dns/data/lorem.yml). 

You can also run your own dns server based on the one in this repo.

## Usage

```
$ lorem --help

  Usage
    $ lorem [input]

  Options
    --debug=[bool]  [Default: false]

  Examples
    $ lorem

    Config
    $ lorem config get
    $ lorem config set key.subkey val
    $ lorem config set arrayKey val1 val2 --array
    $ lorem config del key

    Run Commands
    $ lorem run [command name] [...command params]

```

# Namespaces

Namespaces are how you can add your own commands without having to issue a PR to the Lorem repo. Add a namespace by configuring it: 