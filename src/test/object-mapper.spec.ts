import { ObjectMapper } from "../main/object-mapper";

class TestClass {
    //
}

let obj = ObjectMapper.deserialize<TestClass>(TestClass, '{}');
ObjectMapper.serialize(obj);
