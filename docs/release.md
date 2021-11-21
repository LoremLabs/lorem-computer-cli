# Release

```
npm run release
```

# Add a new command

Create a file called `echo.json`

Then add to IPFS:

```
 lorem cmd create --createFile="./echo.json" --name="echo"
```

Or via flags:

```
% lorem cmd create echo2 --description="desc" --endpoint="https://api.endpoint/here" --contact="@me on github" > echo2.json
```

After uploading the file to IPFS, you'll need to take the IPFS CID and add it to a mapping service, for example:

```
 echo: /ipfs/bafybeihb34kznerboue2fcdentahdh64d7n54zwy47hlsklkivojt7acdu
```

The Lorem.Computer has its own example DNS server that reads from `.yaml` config files.

