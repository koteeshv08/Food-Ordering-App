import 'package:async/async.dart';
import 'package:auth/src/domains/credentials.dart';
import 'package:flutter/widgets.dart';

import '../../domains/auth_service_contract.dart';
import '../../domains/signup_service_contract.dart';
import '../../domains/token.dart';
import '../../infra/api/auth_api_contract.dart';

class EmailAuth implements IAuthService, ISignUpService {

  final IAuthApi _api;
  Credentials _credentials;
  EmailAuth(this._api);

  void credential({@required String email, @required String password}){
    _credentials = Credentials(type: AuthType.email, email: email, password: password);
  }

  @override
  Future<Result<Token>> signIn() async {
    assert(_credentials != null);
    var result = await _api.signIn(_credentials);
    if(result.isError)
      return result.asError;
    return Result.value(Token(value: result.asValue.value));

  }

  @override
  Future<Token> signOut() {
    throw UnimplementedError();
  }

  @override
  Future<Result<Token>> signUp(String name, String email, String password) async {
    Credentials credentials = Credentials(
      type: AuthType.email,
      email: email,
      password: password
    );

    var result = await _api.signUp(credentials);
    if(result.isError)
      return result.asError;
    return Result.value(Token(value: result.asValue.value));
  }
}