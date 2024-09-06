import { ICustomRpcException } from "./IcustomRcpException";

export class CustomRpcException implements ICustomRpcException {
    constructor(public readonly message: string, public readonly status: number) {
    }
}