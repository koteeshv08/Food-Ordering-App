import '../domains/auth_service_contract.dart';
import 'package:async/async.dart';
import '../domains/token.dart';

class SignInUseCase {
  final IAuthService _authService;

  SignInUseCase(this._authService);

  Future<Result<Token>> execute() async {
    return await _authService.signIn();
  }
}