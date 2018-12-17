const CitizensRecord = artifacts.require('./CitizensRecord.sol');
const assert = require('assert');
const truffleAssert = require('truffle-assertions');

contract('CitizensRecord', (accounts) => {
  let contractInstance;
  const ID = 12345;
  const address = '0xc1912fee45d61c87cc5ea59dae31190fffff232d';

  beforeEach(async () => {
    contractInstance = await CitizensRecord.deployed();
  });

  it('create and get basic information of the citizen', async () => {
    const created = await contractInstance.register_citizen(
      'kirian',
      'olle',
      '2/3/4',
      'male',
      'spain',
      'bcn',
      'bcn',
      ID,
      web3.toHex('image-hash'),
    );

    truffleAssert.eventEmitted(created, 'UserAdded', (ev) => {
      return ev.ID.toNumber() === ID;
    }, 'TestEvent should be emitted with correct parameters');

    const getBasicInfo = await contractInstance.get_basic_info(ID);
    assert.equal(getBasicInfo[0].toNumber(), ID);
    assert.equal(getBasicInfo[1], 'kirian');
    assert.equal(getBasicInfo[2], '2/3/4');
    assert.equal(getBasicInfo[3], 'male');
    assert.equal(getBasicInfo[4], 'spain');
    assert.equal(web3.toUtf8(getBasicInfo[5]), 'image-hash');
    assert.equal(getBasicInfo[6], true);

    const getResidency = await contractInstance.get_residency(ID);
    assert.equal(getResidency[0].toNumber(), ID);
    assert.equal(getResidency[1], 'kirian');
    assert.equal(getResidency[2], 'spain');
    assert.equal(getResidency[3], 'bcn');
    assert.equal(getResidency[4], 'bcn');
    // etc
  });

  it('modify citizen', async () => {
    await contractInstance.modify_citizen(
      'jaime',
      'asdasd',
      '1/2/3',
      'female',
      'france',
      'paris',
      'dinamarca',
      ID,
      web3.toHex('image-hash'),
    );

    const getBasicInfo = await contractInstance.get_basic_info(ID);
    assert.equal(getBasicInfo[0].toNumber(), ID);
    assert.equal(getBasicInfo[1], 'jaime');
    assert.equal(getBasicInfo[2], '1/2/3');
    assert.equal(getBasicInfo[3], 'female');
    assert.equal(getBasicInfo[4], 'france');
    assert.equal(web3.toUtf8(getBasicInfo[5]), 'image-hash');
    assert.equal(getBasicInfo[6], true);

    const getResidency = await contractInstance.get_residency(ID);
    assert.equal(getResidency[0].toNumber(), ID);
    assert.equal(getResidency[1], 'jaime');
    assert.equal(getResidency[2], 'france');
    assert.equal(getResidency[3], 'paris');
    assert.equal(getResidency[4], 'dinamarca');
  });

  it('add role', async () => {
    let hasRole = await contractInstance.hasSpecificRole(address, 1);
    assert.equal(hasRole, false);

    const give = await contractInstance.addRole(address, 1);

    truffleAssert.eventEmitted(give, 'RoleAdded', (ev) => {
      return ev.addr === address && ev.roleName.toNumber() === 1;
    });


    hasRole = await contractInstance.hasSpecificRole(address, 1);
    assert.equal(hasRole, true);
  });

  it('remove role', async () => {
    const remove = await contractInstance.removeRole(address, 1);

    truffleAssert.eventEmitted(remove, 'RoleRemoved', (ev) => {
      return ev.addr === address && ev.roleName.toNumber() === 1;
    });


    const hasRole = await contractInstance.hasSpecificRole(address, 1);
    assert.equal(hasRole, false);

  });

  it('register legal record', async () => {
    let num = await contractInstance.getNumberLegalRecords(ID);
    assert.equal(num.toNumber(), 0);

    await contractInstance.registerLegalRecord(
      ID,
      'multa parking',
      '1/2/3'
    );

    num = await contractInstance.getNumberLegalRecords(ID);
    assert.equal(num.toNumber(), 1);

    const legalRecord = await contractInstance.getLegalRecords(ID, 0);

    truffleAssert.eventEmitted(legalRecord, 'SendRegister', (ev) => {
      return ev.record === 'multa parking' && ev.date === '1/2/3' && ev.valid === true;
    });
  });

  it('delete legal record', async () => {
    let num = await contractInstance.getNumberLegalRecords(ID);
    assert.equal(num.toNumber(), 1);

    await contractInstance.deleteLegalRecord(ID, 0);

    num = await contractInstance.getNumberLegalRecords(ID);
    assert.equal(num.toNumber(), 1);

    const legalRecord = await contractInstance.getLegalRecords(ID, 0);

    truffleAssert.eventEmitted(legalRecord, 'SendRegister', (ev) => {
      return ev.record === 'multa parking' && ev.date === '1/2/3' && ev.valid === false;
    });

  });

  it('remove user', async () => {
    const remove = await contractInstance.removeUser(ID);

    truffleAssert.eventEmitted(remove, 'UserRemoved', (ev) => {
      return ev.ID.toNumber() === ID;
    });

    const getBasicInfo = await contractInstance.get_basic_info(ID);
    assert.equal(getBasicInfo[6], false);
  });
});