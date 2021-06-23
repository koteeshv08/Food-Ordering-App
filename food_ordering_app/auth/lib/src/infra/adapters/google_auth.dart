import 'package:async/async.dart';
import '../../domains/auth_service_contract.dart';
import '../../domains/credentials.dart';
import '../../infra/api/auth_api_contract.dart';
import '../../domains/token.dart';
import 'package:google_sign_in/google_sign_in.dart';

class GoogleAuth implements IAuthService {
  final IAuthApi _authApi;
  GoogleSignIn _googleSignIn;
  GoogleSignInAccount _currentUser;

  //injecting googleSignIn instance by default in constructor
  GoogleAuth(this._authApi, [GoogleSignIn googleSignIn])
      : this._googleSignIn =
            googleSignIn ?? GoogleSignIn(scopes: ['email', 'profile']);

  @override
  Future<Result<Token>> signIn() async {
    await _handleGoogleSignIn();
    if (_currentUser == null)
      return Result.error('Failed to signin with Google');
    Credentials credentials = Credentials(type: AuthType.google, email: _currentUser.email, name: _currentUser.displayName);
    var result = await _authApi.signIn(credentials);
    if(result.isError)
      return result.asError;
    return Result.value(Token(value: result.asValue.value));
  }

  @override
  Future<Token> signOut() {
    _googleSignIn.disconnect();
  }

  _handleGoogleSignIn() async {
    try {
      _currentUser = await _googleSignIn.signIn();
    } catch (e) {
      return;
    }
  }
}
