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

  # Preparing for Release

  1. Version number is updated in package.json and config.xml
  2. Api URL is pointing at prod location
  3. Sourcemap generation is turned off
  4. All changes are pushed and merged in GitHub

# Generate aab

  1. In platforms/android run ```gradlew bundle```
    a. See here for more info: https://medium.com/swlh/generating-an-android-app-bundle-from-your-ionic-app-without-android-studio-5bc3acaf4528
  2. Sign the aab (see above link)
