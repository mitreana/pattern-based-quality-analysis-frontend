import api from "./axios";

class DatabaseService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getDatabases() {
        try {
            const payload = await api.get(this.baseUrl);
            return {
                success: true,
                data: payload.data,
            };
        } catch (err) {
            return {
                success: false,
                data: err,
            };
        }
    }

    //http://localhost:8081/qualitypatternmodel/databases/get/card_concrete_finalized
    async getDatabasesOfPattern(patternName) {
        try {
            const payload = await api.get(this.baseUrl + "/get/" + patternName);
            return {
                success: true,
                data: payload.data,
            };
        } catch (err) {
            return {
                success: false,
                data: err,
            };
        }
    }
    //http://localhost:8081/qualitypatternmodel/databases/registration/
    //mydatabase?host=localhost&port=1984&name=demo_database2&password=admin&user=admin

    async postRegisterDatabase(body) {
        try {
            const payload = await api.post(
                this.baseUrl +
                `/registration/${body.localname}?host=${body.host}&port=${body.port}&name=${body.name}&password=${body.password}&user=${body.user}`,
                {
                    Headers: { Origin: "*" },
                }
            );
            return {
                success: true,
                data: payload.data,
            };
        } catch (err) {
            return {
                success: false,
                data: err,
            };
        }
    }

  //http://localhost:8081/qualitypatternmodel/databases/set/mydatabase/card_concrete_finalized

    async postSetDatabaseOfPattern(body) {
        try {
            const payload = await api.post(
                this.baseUrl + `/set/${body.localName}/${body.patternName}`,
                {
                    Headers: { Origin: "*" },
                }
            );
            return {
                success: true,
                data: payload.data,
            };
        } catch (err) {
            return {
                success: false,
                data: err,
            };
        }
    }

    //http://localhost:8081/qualitypatternmodel/databases/deletion/{local-name}
    async deleteDatabase(localName) {
        try {
            const payload = await api.delete(
                this.baseUrl + `/deletion/${localName}`,
                {
                    Headers: { Origin: "*" },
                }
            );
            return {
                success: true,
                data: payload.data,
            };
        } catch (err) {
            return {
                success: false,
                data: err,
            };
        }
    }
}

export default new DatabaseService(
    "http://localhost:8081/qualitypatternmodel/databases"
);