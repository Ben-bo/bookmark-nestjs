import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto/auth.dto';

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);
    pactum.request.setBaseUrl('http://localhost:3333/');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'beni1@gmail.com',
      password: '123456',
    };
    describe('Signin', () => {
      let accessToken: string;
      it('it should throw an error 400 if email is empty', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect();
      });
      it('it should throw an error 400 if password is empty', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
          .inspect();
      });
      it('it should throw an error 400 if no input', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody({})
          .expectStatus(400)
          .inspect();
      });
      it('it should SignIn', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody(dto)
          .expectStatus(201)
          .inspect()
          .stores('userAt', 'token');
      });
    });
    describe('Signup', () => {
      const dto: AuthDto = {
        email: 'beni4@gmail.com',
        password: '123456',
      };
      it('it should throw an error 400 if password is empty', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
          .inspect();
      });
      it('it should throw an error 400 if email is empty', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect();
      });
      it('it should throw an error 400 if no input', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect();
      });
      it('it should signup', () => {
        return pactum
          .spec()
          .get('auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });
  });
  describe('User', () => {
    describe('Get Me', () => {
      it('it should get current user', () => {
        return pactum.spec().post('user/me').expectStatus(200);
      });
    });
    describe('Edit User', () => {});
  });
  describe('Bookmark', () => {
    describe('Create Bookmark', () => {});
    describe('Get All Bookmark', () => {});
    describe('Get Bookmark By Id', () => {});
    describe('Update Bookmark', () => {});
    describe('Delete Bookmark', () => {});
  });
});
