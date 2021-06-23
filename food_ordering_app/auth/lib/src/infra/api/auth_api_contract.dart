import 'package:async/async.dart';
import '../../domains/credentials.dart';

abstract class IAuthApi {
  Future<Result<String>> signIn(Credentials credentials);
  Future<Result<String>> signUp(Credentials credentials);
}
