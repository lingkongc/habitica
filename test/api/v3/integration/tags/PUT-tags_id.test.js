import {
  generateUser,
} from '../../../../helpers/api-integration.helper';

describe('PUT /tags/:tagId', () => {
  let user;

  before(async () => {
    user = await generateUser();
  });

  it('updates a tag given it\'s id', async () => {
    let updatedTagName = 'Tag updated';
    let createdTag = await user.post('/tags', {name: 'Tag 1'});
    let updatedTag = await user.put(`/tags/${createdTag._id}`, {
      name: updatedTagName,
      ignored: true,
    });

    createdTag = await user.get(`/tags/${updatedTag._id}`);

    expect(updatedTag.name).to.equal(updatedTagName);
    expect(updatedTag.ignored).to.not.exist;

    expect(createdTag.name).to.equal(updatedTagName);
    expect(createdTag.ignored).to.not.exist;
  });
});
