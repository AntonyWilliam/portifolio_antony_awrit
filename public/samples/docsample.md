Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Discovery](#discovery)
  - [Steps to Discover the Redis Image](#steps-to-discover-the-redis-image)
- [Installation](#installation)
  - [Role of Cloud Jobs](#role-of-cloud-jobs)
  - [Configuration File](#configuration-file)
    - [Example Configuration File](#example-configuration-file)
    - [Key Parameters](#key-parameters)
    - [Enabling Persistence](#enabling-persistence)
  - [CLI Commands](#cli-commands)
    - [Submit the Job](#submit-the-job)
    - [Check the Job Status](#check-the-job-status)
    - [View Job Logs](#view-job-logs)
    - [Inspect Job Details](#inspect-job-details)
    - [Stop the Job](#stop-the-job)
    - [Delete the Job](#delete-the-job)
- [Usage](#usage)
  - [Verify Redis Is Running](#verify-redis-is-running)
  - [Access Redis Using Port Forwarding](#access-redis-using-port-forwarding)
  - [Connect to Redis From Other Jobs](#connect-to-redis-from-other-jobs)
- [Cleanup](#cleanup)
  - [Stop the Redis Job](#stop-the-redis-job)
  - [Delete the Redis Job](#delete-the-redis-job)
  - [Remove Persistent Volumes](#remove-persistent-volumes)
  - [Clear Configuration Files](#clear-configuration-files)
  - [Verify Cleanup](#verify-cleanup)
- [Related Topics](#related-topics)

## Introduction

Redis is a fast, in-memory data store used for caching and as a database. With Cloud Jobs and CLI, you can deploy and manage Redis efficiently in a cloud environment.

This guide explains how to:
- Find and verify the Redis container image.
- Set up and run Redis using Cloud Jobs and CLI.
- Access Redis for use in your workflows.
- Remove resources and restore your system when finished.

## Prerequisites

Before you begin, ensure the following requirements are met:
1. You are authenticated with the Cloud platform.
2. The Cloud CLI is installed on your system.
3. You have access to:
   - A compute cluster.
   - An active project.

## Discovery

To run Redis on the Cloud platform, you must first locate a publicly available Redis container image. This process involves verifying its version and gathering the necessary details for deployment.

### Steps to Discover the Redis Image

1. **List Available Images**:
   Use the `cloud images` command to display available container images in the current project or cluster. This command provides details such as image name, version, and tags.
   ```bash
   cloud images
   ```

2. **Filter by Name or Tags**:
   If the list is extensive, filter the images using the `--name` or `--tag` options to narrow the results. For example:
   ```bash
   cloud images --name redis --tag latest
   ```

3. **Verify Image Details**:
   Confirm the image's compatibility and metadata. The `cloud image inspect` command provides details about the image configuration, environment variables, and supported architectures.
   ```bash
   cloud image inspect image:redis:latest
   ```

4. **Pull the Image**:
   Pull the Redis image into your project’s storage for use in subsequent deployment steps.
   ```bash
   cloud pull image:redis:latest
   ```

ℹ️ **Note**:
- Ensure you have permissions to access the selected image in your project or organization.
- You can use `cloud ps` to list jobs using Redis images if examples of prior usage are needed.

## Installation

### Role of Cloud Jobs
Cloud Jobs handle the deployment and management of Redis. They allocate resources, manage the container, configure networking, and set up storage. Cloud Jobs also provide tools for monitoring and logging. This allows you to focus on your configuration while the platform manages the infrastructure.

### Configuration File

Create a YAML configuration file to define the Redis job. This file specifies the container image, resources, and other settings. To enable persistent storage for Redis data, configure the `volumes` section to use Cloud Files.

#### Example Configuration File

```yaml
jobs:
  redis:
    image: redis:7.0
    preset: cpu-small
    ports:
      - 6379:6379
    volumes:
      data:
        remote: storage:redis-data
    env:
      - REDIS_PASSWORD=your_password_here
```

#### Key Parameters

- **`image`**: The Redis container image and version (e.g., `redis:7.0`).
- **`preset`**: The resource allocation for the job (e.g., `cpu-small`).
- **`ports`**: Maps the Redis port (`6379`) to an external port.
- **`volumes`**: Configures persistent storage for Redis data using Cloud Files. The `remote` field specifies the storage location (`storage:redis-data`).
- **`env`**: Sets environment variables, such as the Redis password.

#### Enabling Persistence
The `volumes` section ensures that Redis data persists even if the job is stopped or restarted. This is essential for use cases requiring long-term data retention.

ℹ️ **Note**: Make sure to save this file as `redis.yaml` in your working directory.

### CLI Commands
Use the Cloud CLI to deploy and manage the Redis job.

#### Submit the Job
Run this command to start the Redis job:
```bash
cloud run --job-file redis.yaml
```
✅ **Step Complete**: The job has been submitted successfully if no errors are returned.

#### Check the Job Status
Use this command to confirm the job is running:
```bash
cloud ps
```
✅ **Step Complete**: The job is active if it appears in the list.

#### View Job Logs
Check the logs to verify that Redis started correctly:
```bash
cloud logs redis
```
ℹ️ **Note**: Logs can provide important details about errors or Redis startup status.

#### Inspect Job Details
Retrieve detailed information about the Redis job:
```bash
cloud job inspect <job-name>
```
ℹ️ **Note**: Use this command to debug or verify the job's configuration and resource usage.

#### Stop the Job
Use this command to stop the Redis job:
```bash
cloud kill <job-name>
```
✅ **Step Complete**: The job will stop running and free up resources.

#### Delete the Job
Remove the job from the cluster entirely:
```bash
cloud delete <job-name>
```
ℹ️ **Note**: Only delete jobs if you no longer need them, as this action is irreversible.

## Usage

After deploying Redis with Cloud Jobs, confirm that it is running and learn how to access and interact with it. This section includes verification steps, port-forwarding for external access, and how other jobs can interact with Redis.

### Verify Redis Is Running
Check the status of the Redis job to ensure it is active:
```bash
cloud ps
```
✅ **Step Complete**: The Redis job is running if it appears in the job list with a `RUNNING` status.

### Access Redis Using Port Forwarding
To access Redis locally, use port forwarding to map the cluster's Redis port to your local machine:
```bash
cloud port-forward <job-name> 6379:6379
```
ℹ️ **Note**: Replace `<job-name>` with the name of your Redis job. By default, Redis runs on port `6379`.

Once the port is forwarded, you can use a Redis client to connect locally:
```bash
redis-cli -h localhost -p 6379
AUTH your_password_here
```
✅ **Step Complete**: You are now connected to the Redis instance.

### Connect to Redis From Other Jobs
If other jobs need to interact with Redis, include its cluster IP and port in their configurations. Retrieve the Redis job’s IP using:
```bash
cloud job inspect <job-name>
```

Update the dependent job's YAML configuration to include Redis details, such as:
```yaml
env:
  - REDIS_HOST=<redis-ip>
  - REDIS_PORT=6379
  - REDIS_PASSWORD=your_password_here
```

ℹ️ **Note**: The `REDIS_HOST` environment variable should match the Redis job's IP address obtained from the inspect command.

## Cleanup

After completing your Redis usage, remove the deployed resources to restore the system to its original state.

### Stop the Redis Job
Stop the running Redis job:
```bash
cloud kill <job-name>
```
✅ **Step Complete**: The Redis job is no longer running.

### Delete the Redis Job
Delete the job from the cluster:
```bash
cloud delete <job-name>
```
ℹ️ **Note**: Deleting a job is irreversible. Ensure you no longer need it before running this command.

### Remove Persistent Volumes
Delete the associated volume if you used persistent storage:
```bash
cloud volume delete storage:redis-data
```
✅ **Step Complete**: The volume is deleted, and all associated data is removed.

### Clear Configuration Files
Remove the `redis.yaml` configuration file if no longer needed:
```bash
rm redis.yaml
```
ℹ️ **Note**: Keeping unnecessary files may clutter your workspace.

### Verify Cleanup
Check that no Redis-related jobs or volumes remain:
```bash
cloud ps
cloud volume list
```
✅ **Step Complete**: The system is restored to its original state.

## Related Topics

- **Cloud CLI Reference**: [Detailed commands for managing jobs, volumes, and configurations](javascript:void(0)).
- **Concepts and Use Cases**: [Examples and best practices for deploying and managing workloads](javascript:void(0)).
- **Cloud YAML Guide**: [Explanation of YAML syntax and parameters for job configurations](javascript:void(0)).
- **Cluster Management**: [Managing resources, users, and quotas in a Cloud cluster](javascript:void(0)).
- **Persistent Storage**: [Guide to configuring and using persistent volumes with Cloud](javascript:void(0)).

Was this article helpful?
|[:heavy_check_mark: Yes](javascript:void(0))|[:x: No](javascript:void(0))|
|---|---|

If you have any questions, please contact our technical support team. They will be happy to assist you.
