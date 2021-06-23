import 'dart:convert';
import 'package:auth/src/domains/credentials.dart';
import 'package:auth/src/infra/api/auth_api.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/mockito.dart';
import 'package:async/async.dart';
import 'package:async/src/result/value.dart';

class MockClient extends Mock implements http.Client {}

void main() {
  MockClient client;
  AuthApi sut;

  setUp(() {
    client = MockClient();
    sut = AuthApi('http:baseUrl', client);
  });

  group('signin', () {
    var credential = Credentials(
        type: AuthType.email, email: 'email@email', password: 'pass');
    //testing for error cases
    test('should return error when status code is not 200', () async {
      //arrange
      when(client.post(any, body: anyNamed('body')))
          .thenAnswer((_) async => http.Response('{}', 404));
      //act
      var result = await sut.signIn(credential);
      //assert
      expect(result, isA<ErrorResult>());
    });
    test('should return error when status code is 200 but malformed json', () async {
      //arrange
      when(client.post(any, body: anyNamed('body')))
          .thenAnswer((_) async => http.Response('{}', 200));
      //act
      var result = await sut.signIn(credential);
      //assert
      expect(result, isA<ErrorResult>());
    });

    test('should return token string when succesful', () async {
      //arrange
      var tokenStr = 'Random String';
      when(client.post(any, body: anyNamed('body')))
          .thenAnswer((_) async => http.Response(jsonEncode({'auth_token': tokenStr}), 200));
      //act
      var result = await sut.signIn(credential);
      //assert
      expect(result.asValue.value, tokenStr);
    });
  });
}
