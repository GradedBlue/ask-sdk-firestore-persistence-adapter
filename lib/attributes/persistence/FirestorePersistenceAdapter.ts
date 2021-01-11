/*
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import {
    createAskSdkError,
    PersistenceAdapter
} from 'ask-sdk-core';
import { RequestEnvelope } from 'ask-sdk-model';
import {Firestore} from '@google-cloud/firestore';
import {
    PartitionKeyGenerator,
    PartitionKeyGenerators
} from './PartitionKeyGenerators';

/**
 * Implementation of {@link PersistenceAdapter} using Firebase Firestore.
 */
export class FirestorePersistenceAdapter implements PersistenceAdapter {
    protected collectionName: string;
    protected partitionKeyName: string;
    protected attributesName: string;
    protected firestore: Firestore;
    protected partitionKeyGenerator: PartitionKeyGenerator;

    constructor(config: {
        collectionName: string,
        partitionKeyName? : string,
        attributesName? : string,
        firestore: Firestore,
        partitionKeyGenerator? : PartitionKeyGenerator;
    }) {
        this.collectionName = config.collectionName;
        this.partitionKeyName = config.partitionKeyName ? config.partitionKeyName : 'id';
        this.firestore = config.firestore;
        this.partitionKeyGenerator = config.partitionKeyGenerator ? config.partitionKeyGenerator : PartitionKeyGenerators.userId;
    }

    /**
     * Retrieves persistence attributes from Firestore.
     * @param {RequestEnvelope} requestEnvelope Request envelope used to generate partition key.
     * @returns {Promise<Object.<string, any>>}
     */
    public async getAttributes(requestEnvelope: RequestEnvelope): Promise<{[key: string]: any}> {
        const attributesId = this.partitionKeyGenerator(requestEnvelope);

        let doc;
        try {
            doc = await this.firestore.collection(this.collectionName).doc(attributesId).get();
        } catch (err) {
            throw createAskSdkError(
                this.constructor.name,
                `Could not read item (${attributesId}) from collection (${this.collectionName}): ${err.message}`,
            );
        }

        if (!doc.exists) {
            return {};
        } else {
            return doc.data();
        }
    }

    /**
     * Saves persistence attributes to Firestore.
     * @param {RequestEnvelope} requestEnvelope Request envelope used to generate partition key.
     * @param {Object.<string, any>} attributes Attributes to be saved to Firestore.
     * @return {Promise<void>}
     */
    public async saveAttributes(requestEnvelope: RequestEnvelope, attributes: {[key: string]: any}): Promise<void> {
        const attributesId = this.partitionKeyGenerator(requestEnvelope);

        try {
            await this.firestore.collection(this.collectionName).doc(attributesId).set(attributes);
        } catch (err) {
            throw createAskSdkError(
                this.constructor.name,
                `Could not save item (${attributesId}) to table (${this.collectionName}): ${err.message}`,
            );
        }
    }

    /**
     * Delete persistence attributes from Firestore.
     * @param {RequestEnvelope} requestEnvelope Request envelope used to generate partition key.
     * @return {Promise<void>}
     */
    public async deleteAttributes(requestEnvelope: RequestEnvelope): Promise<void> {
        const attributesId = this.partitionKeyGenerator(requestEnvelope);

        try {
            await this.firestore.collection(this.collectionName).doc(attributesId).delete();
        } catch (err) {
            throw createAskSdkError(
                this.constructor.name,
                `Could not delete item (${attributesId}) from table (${this.collectionName}): ${err.message}`,
            );
        }
    }
}
