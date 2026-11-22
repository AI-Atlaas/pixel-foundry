// Stops `npm run publish-integration` unless GITBOOK_ORGANIZATION is set.
// The organization ID is kept out of gitbook-manifest.yaml, and the GitBook
// CLI reads this variable in its place when publishing.
const id = process.env.GITBOOK_ORGANIZATION?.trim();

if (!id) {
  console.error(`GITBOOK_ORGANIZATION is not set.

Publish with your GitBook organization ID (the <id> in app.gitbook.com/o/<id>/):

  GITBOOK_ORGANIZATION=<id> npm run publish-integration

To list the organizations you belong to: npx gitbook organizations list`);
  process.exit(1);
}
