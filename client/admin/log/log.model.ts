export class Log {
    private ip: String;
    private method: String;
    private target: String;
    private created: Date;

    constructor(ip: String, method: String, target: String,
                    created: Date) {
        this.ip = ip;
        this.method = method;
        this.target = target;
        this.created = created;
    }
}