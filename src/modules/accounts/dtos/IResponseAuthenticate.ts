export default interface IResponseAuthenticate {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
