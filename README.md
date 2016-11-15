# MEA2N Stack Starter

### Introduction
                This is personal project starter for MEA2N Stack.
### Dependencies
                Mongo DB
                Express
                Angular 2
                Node Js
                JWT
                Passport
                Handlebars
                WebPack 2
### DB Model
##### Settings
                version: String, required
                admin: String, required
                web_title: String, required
                db_backup: String
                created: Date, required
##### User
                email: String, unique, required
                name: String, required
                role: String, required
                created: Date, required
                password: crypto, passport
##### Log
                ip: String, required
                target: String, required
                created: Date, required