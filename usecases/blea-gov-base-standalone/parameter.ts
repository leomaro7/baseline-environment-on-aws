import { Environment } from 'aws-cdk-lib';

export interface AppParameter {
  env?: Environment;
  envName: string;
  securityNotifyEmail: string;
  // securitySlackWorkspaceId: string; // required if deploy via CLI
  // securitySlackChannelId: string; // required if deploy via CLI
}

// Example
export const devParameter: AppParameter = {
  envName: 'Development', // 'Production','Staging',
  securityNotifyEmail: 'XXX@icloud.com',
  // securitySlackWorkspaceId: 'T8XXXXXXX', // SLACK
  // securitySlackChannelId: 'C00XXXXXXXX', // SLACK
  // env: { account: '123456789012', region: 'ap-northeast-1' },
};
