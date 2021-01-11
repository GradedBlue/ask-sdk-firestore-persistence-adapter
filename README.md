ASK SDK Firestore Persistence Adapter package contains implementation of persistence adapter in Core SDK ('ask-sdk-core') based on AWS SDK.

## Installing
ASK SDK Firestore Persistence Adapter package is an addon package for the core SDK ('ask-sdk-core') and thus has peer dependency of the core SDK package. From within your NPM project, run the following commands in the terminal to install them:

```
npm install ask-sdk-firestore-persistence-adapter
```

## Usage and Getting Started

```
const { FirestorePersistenceAdapter } = require('ask-sdk-firestore-persistence-adapter');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

const adapter = new FirestorePersistenceAdapter({
    collectionName: 'alexa',
    firestore: firestore
});

exports.handler = alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withPersistenceAdapter(adapter)
    .create();
```

## Usage with TypeScript
The ASK SDK Firestore Persistence Adapter package for Node.js bundles TypeScript definition files for use in TypeScript projects and to support tools that can read .d.ts files. Our goal is to keep these TypeScript definition files updated with each release for any public api.

### Pre-requisites
Before you can begin using these TypeScript definitions with your project, you need to make sure your project meets a few of these requirements:
- Use TypeScript v2.x
- Includes the TypeScript definitions for node. You can use npm to install this by typing the following into a terminal window:

```
npm install --save-dev @types/node
```

### In Node.js
To use the TypeScript definition files within a Node.js project, simply import ask-sdk-firestore-persistence-adapter as below:

In a TypeScript file:

```typescript
import { FirestorePersistenceAdapter } from 'ask-sdk-firestore-persistence-adapter';
```

In a JavaScript file:

```javascript
const { FirestorePersistenceAdapter } = require('ask-sdk-firestore-persistence-adapter');
```

## Opening Issues
For bug reports, feature requests and questions, we would like to hear about it. Search the [existing issues](https://github.com/GradedBlue/ask-sdk-firestore-persistence-adapter/issues) and try to make sure your problem doesn’t already exist before opening a new issue. It’s helpful if you include the version of the SDK, Node.js or browser environment and OS you’re using. Please include a stack trace and reduced repro case when appropriate, too. 

## License
This SDK is distributed under the Apache License, Version 2.0, see LICENSE for more information.
