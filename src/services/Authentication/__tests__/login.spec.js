const describeServiceMethod = require("../../../testUtils/describeServiceMethod");
const errors = require("../../../errors").default;
const bcrypt = require("bcrypt");

const makeReq = ({ params = {}, body = {} }) => ({ params, body });

// TODO: write specs for correct settings

describeServiceMethod(
  "services/Authentication/login",
  (login, { container, _setContainer }) => {
    const { User, UserAppPassword } = container.db;

    _setContainer({
      UserService: require("../../User").default(container),
    });

    [
      {
        describeText: "when provided no email",
        itText: `throws an error: ${errors.authentication.AUTH_NO_P_OR_U.message}`,
        req: makeReq({ body: { password: "password" } }),
        expected: {
          error: true,
          result: errors.authentication.AUTH_NO_P_OR_U,
        },
      },
      {
        describeText: "when provided no passowrd",
        itText: `throws an error: ${errors.authentication.AUTH_NO_P_OR_U.message}`,
        req: makeReq({ body: { email: "email" } }),
        expected: {
          error: true,
          result: errors.authentication.AUTH_NO_P_OR_U,
        },
      },
      {
        describeText:
          "when provided email & password for user that doesn't exist",
        itText: `throws an error: ${errors.authentication.AUTH_USER_NOT_FOUND.message}`,
        req: makeReq({
          body: { email: "email@email.com", password: "password" },
        }),
        queueResult: () => {
          User.$queueResult(null);
        },
        expected: {
          error: true,
          result: errors.authentication.AUTH_USER_NOT_FOUND,
        },
      },
      {
        describeText: "when provided email & incorrect password for user",
        itText: `throws an error: ${errors.authentication.AUTH_USER_WRONG_PW.message}`,
        req: makeReq({
          body: { email: "email@email.com", password: "wrong_password" },
        }),
        queueResult: async () => {
          const hashedPassword = await bcrypt.hash(
            "password",
            bcrypt.genSaltSync(8)
          );

          User.$queueResult(
            User.build({ email: "email@email.com", password: hashedPassword })
          );
        },
        expected: {
          error: true,
          result: errors.authentication.AUTH_USER_WRONG_PW,
        },
      },
      {
        describeText: "when provided email & correct password for user",
        itText: `sets container with currentUser and userSettings`,
        req: makeReq({
          body: { email: "email@email.com", password: "password" },
        }),
        queueResult: async () => {
          const hashedPassword = await bcrypt.hash(
            "password",
            bcrypt.genSaltSync(8)
          );

          User.$queueResult(
            User.build({ email: "email@email.com", password: hashedPassword })
          );
        },
        expected: {
          result: {
            currentUser: { id: 1, email: "email@email.com" },
            userSettings: { setting1: true },
          },
        },
      },
      {
        describeText: "when provided appId and user doesn't have account",
        itText: `throws an error: ${errors.authentication.AUTH_NO_P_OR_U.message}`,
        req: makeReq({
          body: {
            email: "email@email.com",
            password: "password",
          },
          params: {
            appId: 123,
          },
        }),
        queueResult: async () => {
          const hashedPassword = await bcrypt.hash(
            "password",
            bcrypt.genSaltSync(8)
          );

          User.$queueResult(
            User.build({ email: "email@email.com", password: hashedPassword })
          );
          UserAppPassword.$queueResult(null);
        },
        expected: {
          error: true,
          result: errors.authentication.AUTH_USER_NOT_FOUND,
        },
      },
      {
        describeText: "when provided appId and user has account",
        itText: `sets container with currentUser and userSettings`,
        req: makeReq({
          body: {
            email: "email@email.com",
            password: "password",
          },
          params: {
            appId: 123,
          },
        }),
        queueResult: async () => {
          const hashedPassword = await bcrypt.hash(
            "password",
            bcrypt.genSaltSync(8)
          );

          User.$queueResult(User.build({ email: "email@email.com" }));
          UserAppPassword.$queueResult(
            UserAppPassword.build({ password: hashedPassword })
          );
        },
        expected: {
          result: {
            currentUser: { id: 1, email: "email@email.com" },
            userSettings: { setting1: true },
          },
        },
      },
    ].forEach((testCase) => {
      beforeEach(async () => {
        _setContainer({ currentUser: null, userSettings: null });

        if (testCase.queueResult) {
          await testCase.queueResult();
        }
      });

      describe(testCase.describeText, () => {
        const res = {
          locals: {
            container: {
              register: () => {
                _setContainer({
                  currentUser: { id: 1, email: "email@email.com" },
                  userSettings: { setting1: true },
                });
              },
            },
          },
        };

        it(testCase.itText, async () => {
          let error = null;

          try {
            await login(testCase.req, res);
          } catch (err) {
            error = err;
          }

          if (testCase.expected.error) {
            expect(error).toEqual(testCase.expected.result);
          } else {
            expect(error).toEqual(null);

            expect(container.currentUser).toEqual(
              testCase.expected.result.currentUser
            );
            expect(container.userSettings).toEqual(
              testCase.expected.result.userSettings
            );
          }
        });
      });
    });
  }
);
