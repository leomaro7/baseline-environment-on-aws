import * as cdk from 'aws-cdk-lib';
import { BLEAGovBaseStandaloneStack } from '../lib/stack/blea-gov-base-standalone-stack';

// Import parameters for each enviroment
import { devParameter } from '../parameter';

const app = new cdk.App();

const argContext = 'environment';
const envKey = app.node.tryGetContext(argContext);
if (envKey == undefined)
  throw new Error(`Please specify environment with context option. ex) cdk deploy -c ${argContext}=dev`);
const envVals = app.node.tryGetContext(envKey);
if (envVals == undefined) throw new Error('Invalid environment.');

const severityLabels = envVals.Severity.Label;

// if (!devParameter.securitySlackWorkspaceId || !devParameter.securitySlackChannelId) {
//   throw new Error('securitySlackWorkspaceId and securitySlackChannelId are required');
// }

// Create stack for "Dev" environment.
// If you have multiple environments, instantiate stacks with its parameters.
new BLEAGovBaseStandaloneStack(app, 'Dev-BLEAGovBaseStandalone', {
  description: 'BLEA Governance Base for standalone account (uksb-1tupboc58) (tag:blea-gov-base-standalone)',
  env: {
    account: devParameter.env?.account || process.env.CDK_DEFAULT_ACCOUNT,
    region: devParameter.env?.region || process.env.CDK_DEFAULT_REGION,
  },
  tags: {
    Repository: 'aws-samples/baseline-environment-on-aws',
    Environment: devParameter.envName,
  },

  securityNotifyEmail: devParameter.securityNotifyEmail,
  envName: devParameter.envName,
  severityLabels: severityLabels,
  // securitySlackWorkspaceId: devParameter.securitySlackWorkspaceId,
  // securitySlackChannelId: devParameter.securitySlackChannelId,
});
