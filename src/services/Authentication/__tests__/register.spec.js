const describeServiceMethod = require("../../../testUtils/describeServiceMethod");
const errors = require("../../../errors").default;
const bcrypt = require("bcrypt");

const makeReq = ({ params = {}, body = {} }) => ({ params, body });

// TODO: write specs for correct settings
const getHashedPassword = (pw) => bcrypt.hash(pw, bcrypt.genSaltSync(8));

describeServiceMethod(
  "services/Authentication/register",
  (register, { container, _setContainer }) => {
    const { User, UserAppPassword, UserAppSetting } = container.db;

    _setContainer({
      UserService: require("../../User").default(container),
    });

    const newUser = {
      email: "new@email.com",
      password: "password",
    };

    [
      {
        describeText: "when provided new email and no appId",
        itText: `creates new User`,
        req: makeReq({ body: newUser }),
        queueResult: async () => {
          const hashedPassword = await getHashedPassword("password");

          const user1 = User.build({ ...newUser, password: hashedPassword });

          User.$queueResult(null);
          User.$queueResult(user1);
          User.$queueResult(user1);
          User.$queueResult(user1);

          UserAppPassword.$queueResult(null);
          UserAppSetting.$queueResult(null);
        },
        expected: {
          assertions({ results }) {
            expect(results.user).toBeTruthy();
            expect(results.userAppSetting).toBeFalsy();
            expect(results.userAppPassword).toBeFalsy();
          },
          result: {
            currentUser: { id: 1, email: "new@email.com" },
            userSettings: { setting1: true },
            user1: newUser,
            userAppPassword: null,
            userAppSetting: null,
          },
        },
      },
      {
        describeText: "when provided new email and appId",
        itText: `creates new User, UserAppPassword, & UserAppSetting`,
        req: makeReq({
          body: newUser,
          params: { appId: 1 },
        }),
        queueResult: async () => {
          const hashedPassword = await getHashedPassword("password");

          const user1 = User.build({ ...newUser, password: null });

          User.$queueResult(null);
          User.$queueResult(user1);
          User.$queueResult(user1);
          User.$queueResult(user1);

          const ids = { appId: 1, userId: user1.id };

          UserAppPassword.$queueResult(
            UserAppPassword.build({ ...ids, password: hashedPassword })
          );
          UserAppSetting.$queueResult(
            UserAppSetting.build({ ...ids, settings: {} })
          );
        },
        expected: {
          assertions({ results }) {
            expect(results.user).toBeTruthy();
            expect(results.userAppSetting).toBeTruthy();
            expect(results.userAppPassword).toBeTruthy();
          },
          result: {
            currentUser: { id: 1, email: "new@email.com" },
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

      afterEach(async () => {
        User.$clearQueue();
      });

      describe(testCase.describeText, () => {
        const res = {
          locals: {
            container: {
              register: () => {
                _setContainer({
                  currentUser: { id: 1, email: "new@email.com" },
                  userSettings: { setting1: true },
                });
              },
            },
          },
        };

        it(testCase.itText, async () => {
          let error = null;

          try {
            await register(testCase.req, res);
          } catch (err) {
            error = err;
          }
          const user = await User.find({ where: { id: 1 } });

          const where = { userId: 1, appId: 1 };
          const userAppPassword = await UserAppPassword.find({ where });
          const userAppSetting = await UserAppSetting.find({ where });

          const { expected } = testCase;

          expect(error).toEqual(null);

          expect(container.currentUser).toEqual(expected.result.currentUser);
          expect(container.userSettings).toEqual(expected.result.userSettings);

          if (expected.assertions) {
            expected.assertions({
              container,
              results: { user, userAppPassword, userAppSetting },
            });
          }
        });
      });
    });
  }
);
