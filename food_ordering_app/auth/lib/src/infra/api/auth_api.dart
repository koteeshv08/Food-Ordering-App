import 'dart:convert';

import 'mapper.dart';
import '../../domains/credentials.dart';
import 'package:async/async.dart';
import 'auth_api_contract.dart';
import 'package:http/http.dart' as http;

//implement auth_api_contracts
class AuthApi implements IAuthApi {
  final http.Client _client;
  String baseUrl;

  AuthApi(this.baseUrl, this._client);

  @override
  Future<Result<String>> signIn(Credentials credentials) async {
    var endpoint = baseUrl + '/auth/signin';
    return await _postCredential(endpoint, credentials);
  }

  @override
  Future<Result<String>> signUp(Credentials credentials) async {
    var endpoint = baseUrl + '/auth.signup';
    return await _postCredential(endpoint, credentials);
  }

  Future<Result<String>> _postCredential(
      String endpoint, Credentials credentials) async {
    var response =
        await _client.post(Uri.parse(endpoint), body: Mapper.toJson(credentials));

    if (response.statusCode != 200) return Result.error("Server error");

    var json = jsonDecode(response.body);
    return json['auth_token'] != null
        ? Result.value(json['auth_token'])
        : Result.error(json['message']);
  }
}
