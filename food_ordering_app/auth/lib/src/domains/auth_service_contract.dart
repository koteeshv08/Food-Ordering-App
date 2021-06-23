import 'token.dart';
import 'package:async/async.dart';

abstract class IAuthService {
  //using async package, it allows us to send a result that is 
  //either valid or error 
  Future<Result<Token>> signIn();
  Future<Token> signOut();
}