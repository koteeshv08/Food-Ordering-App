import 'token.dart';
import 'package:async/async.dart';

//Used interface segregation principle
//Not created in auth_service_contract as signup is only for email authenticaion
//Can't use signup for google or facebook

abstract class ISignUpService {
  Future <Result<Token>> signUp(
    String name,
    String email, 
    String password,
  );
}