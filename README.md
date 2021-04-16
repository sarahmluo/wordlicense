# wordlicense

# Known Issues

 To generate sourcemaps when debugging, update lines 24 and 28 in
 
 ```bash
 node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js 
 ```
 to use the value ```inline-source-map```. Then when debugging remotely, you 
 can find the original typescript files in the webpack folder.

 If the above doesn't work, add the following in ionic.config.json:

 ```bash
   "hooks": {
    "build:after": "./attach-source-maps.js"
  }
  ```

