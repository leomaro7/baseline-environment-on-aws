import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { BLEAServerlessApiStack } from '../lib/stack/blea-guest-serverless-api-sample-stack';
import { devParameter } from '../parameter';

test('Snapshot test for ServerlessApi Stack', () => {
  const app = new cdk.App();
  const stack = new BLEAServerlessApiStack(app, 'Dev-BLEAServerlessApi', {
    // Account and Region on test
    //  cdk.process.env.* returns undefined, and cdk.Stack.of(this).* returns ${Token[Region.4]} at test time.
    //  In such case, RegionInfo.get(cdk.Stack.of(this).region) returns error and test will fail.
    //  So we pass 'ap-northeast-1' as region code.
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION ?? 'ap-northeast-1',
    },
    tags: {
      Repository: 'aws-samples/baseline-environment-on-aws',
      Environment: devParameter.envName,
    },

    monitoringNotifyEmail: devParameter.monitoringNotifyEmail,
    monitoringSlackWorkspaceId: devParameter.monitoringSlackWorkspaceId,
    monitoringSlackChannelId: devParameter.monitoringSlackChannelId,
  });
  expect(Template.fromStack(stack)).toMatchSnapshot();
});
