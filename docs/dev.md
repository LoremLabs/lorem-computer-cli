# Dev Notes

To develop this locally, pull down the repo, then:

```
% npm link
```

Which will put `lorem` in the path for you to test locally.

# Local Task Development

To develop tasks locally outside of IPFS, create a task definition:

```
%  lorem cmd create taskName --description="description" --endpoint="http://..." --contact="my@email" > taskName.json
```

And then set your local config with this information:

```
% cat taskName.json | lorem config set cmd.$taskName
```

For example:

```
cat mytask.json | lorem config set cmd.mytask
```

You can then check to make sure it was stored by reading back the config:

```
% lorem config get cmd.mytask
```
