import { ObjectMapper } from "../main/object-mapper";

class TestClass {
    //
}

ObjectMapper.deserialize<TestClass>(TestClass, '{}');
