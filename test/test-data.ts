import { ResourceDescriptorCollection } from "../src/model/resource-descriptor";

export class TestData {
    public static readonly instance: TestData = new TestData()
    public resourceDescriptors: ResourceDescriptorCollection
}