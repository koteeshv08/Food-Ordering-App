import 'package:flutter/widgets.dart';

class Credentials {
  final AuthType type;
  final String name;
  final String email;
  final String password;
  
  Credentials({
    @required this.type,
    this.name, 
    @required this.email, 
    @required this.password
    });
}

//To check which type user is authenticated using email, google, facebook,...
enum AuthType {email, google}
