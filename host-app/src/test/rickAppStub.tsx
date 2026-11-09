// Test-only stand-in for the federated module rickApp/App.
// Real remotes are resolved at runtime by Module Federation; each test
// overrides this stub with vi.mock().
const RemoteStub = () => <p>remote stub</p>;
export default RemoteStub;
