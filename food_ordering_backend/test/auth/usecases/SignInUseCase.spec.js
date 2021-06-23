"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = __importStar(require("chai"));
var SignInUseCase_1 = __importDefault(require("../../../src/auth/usecases/SignInUseCase"));
var FakeRepository_1 = __importDefault(require("../helpers/FakeRepository"));
var FakePasswordService_1 = __importDefault(require("../helpers/FakePasswordService"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
//middleware
chai_1.default.use(chai_as_promised_1.default);
/*Similiar to group in flutter testing framework */
describe('SignInUseCase', function () {
    var sut;
    var respository;
    var passwordService;
    var user = {
        email: 'example@gmail.com',
        id: '1234',
        name: 'Kim',
        password: '$2b$10$K0HEqyYUlQLaj.Xkp9tDzuRclzJqdKCYV7gEHtSVIlu8NRtLM6flC',
        type: 'email',
    };
    beforeEach(function () {
        respository = new FakeRepository_1.default();
        passwordService = new FakePasswordService_1.default();
        sut = new SignInUseCase_1.default(respository, passwordService);
    });
    it('should throw error when user is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = { email: 'wrong@gmail.com', password: '1234', name: '', auth_type: 'email' };
                    //assert
                    return [4 /*yield*/, chai_1.expect(sut.execute(user.email, user.password)).to.be.rejectedWith('User not found')];
                case 1:
                    //assert
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return user id when email and password is correct', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = { email: 'example@gmail.com',
                        id: '1234',
                        name: 'Kim',
                        password: '$2b$10$K0HEqyYUlQLaj.Xkp9tDzuRclzJqdKCYV7gEHtSVIlu8NRtLM6flC',
                        type: 'email' };
                    return [4 /*yield*/, sut.execute(user.email, user.password)
                        //assert
                    ];
                case 1:
                    id = _a.sent();
                    //assert
                    chai_1.expect(id).to.be.equal(user.id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return user id when email is correct and type is not email', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sut.execute(user.email, '')
                    //assert
                ];
                case 1:
                    id = _a.sent();
                    //assert
                    chai_1.expect(id).to.be.equal(user.id);
                    return [2 /*return*/];
            }
        });
    }); });
});
