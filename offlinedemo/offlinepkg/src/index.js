import BSON, { EJSON } from 'bson';

export function offlinePkgDoSome() {
    const doc = {
        longValue: BSON.Long.fromNumber(100),
    };
    const dd = BSON.serialize(doc);
    const ddd = BSON.deserialize(dd);
    console.log('old BSON', doc, dd, ddd);

    const ero = { "int32": { "$numberInt": "10" } };
    const et = JSON.stringify(ero);
    const es = EJSON.serialize(ero);
    console.log('ejson parse no relaxed', EJSON.parse(et, { relaxed: false }))
    console.log('ejson parse:', EJSON.parse(et));
    console.log('ejson serialize', es);
    console.log('ejson deserialize', EJSON.deserialize(es));
}