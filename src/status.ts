import { PullRequestContext } from '@/src/context'
import { OctokitInstance } from '@/src/octokitInstance'

export const setCheckStatusAsSuccess = async (
  octokit: OctokitInstance,
  context: PullRequestContext,
): Promise<void> => {
  await octokit.repos.createCommitStatus({
    owner: context.repoOwner,
    repo: context.repoName,
    sha: context.pullRequest.headRef,
    state: 'success',
    context: 'Unresolved Review Threads',
    description: 'no unresolved threads found',
    target_url: `https://github.com/${context.repoOwner}/${context.repoName}/actions/runs/${context.runId}`,
  })
}

export const setCheckStatusAsFailure = async (
  octokit: OctokitInstance,
  context: PullRequestContext,
  numberOfUnresolvedThreads: number,
): Promise<void> => {
  await octokit.repos.createCommitStatus({
    owner: context.repoOwner,
    repo: context.repoName,
    sha: context.pullRequest.headRef,
    state: 'failure',
    context: 'Unresolved Review Threads',
    description: `${numberOfUnresolvedThreads} unresolved threads found`,
    target_url: `https://github.com/${context.repoOwner}/${context.repoName}/actions/runs/${context.runId}`,
  })
}
