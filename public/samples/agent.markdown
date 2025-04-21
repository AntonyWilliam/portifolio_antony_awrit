This document describes how to create an automated customer support agent using n8n and the OpenAI API to respond to user queries via email.

**Table of Contents**:

- [Building an AI-Powered Customer Support Agent with n8n and OpenAI]()
  - [What is n8n?]()
  - [What is OpenAI?]()
    - [What is an AI Agent?]()
  - [Prerequisites]()
  - [Setting up the AI Agent Workflow]()
    - [Step 1: Set up n8n]()
    - [Step 2: Obtain OpenAI API Key]()
    - [Step 3: Configure OpenAI Credentials in n8n]()
    - [Step 4: Create the Workflow]()
    - [Step 5: Test the Workflow]()
  - [Example Use Case]()
  - [Related Topics]()

## What is n8n?

n8n is an open-source workflow automation platform that enables users to connect applications and services through a visual interface. It supports both no-code and code-based approaches, making it versatile for automating tasks like data processing, notifications, and API integrations. n8n’s node-based structure allows seamless integration with tools like OpenAI, enhancing automation capabilities.

**Key Features of n8n**:

| Feature | Description |
| --- | --- |
| **Visual Editor** | Drag-and-drop interface for building workflows. |
| **Extensive Integrations** | Connects to over 400 apps, including OpenAI and email services. |
| **Custom Nodes** | Supports JavaScript for custom functionality. |
| **Triggers** | Initiates workflows via schedules, webhooks, or events. |
| **Error Handling** | Built-in tools for managing errors and retries. |

For more details, visit the n8n Documentation.

## What is OpenAI?

OpenAI is a leading AI research organization offering powerful language models through its API, such as GPT-4, which excel in generating human-like text. The API enables developers to integrate AI capabilities into applications for tasks like content generation, question answering, and automation, making it ideal for building AI agents.

### What is an AI Agent?

An AI agent is an autonomous system that uses AI to perceive its environment, make decisions, and perform tasks. In this context, the AI agent is a customer support bot that processes incoming emails, generates responses using OpenAI’s GPT model, and sends replies via n8n’s email node.

> :information_source: **Note**: AI agents can range from simple chatbots to complex systems with tool integration, like search or database access.

## Prerequisites

Before starting, ensure you have:

- An n8n instance (local or cloud-based).
- An OpenAI API key from OpenAI.
- An email service account (e.g., Gmail) with SMTP credentials for sending replies.
- Basic knowledge of n8n workflows and API usage.

## Setting up the AI Agent Workflow

### Step 1: Set up n8n

Install n8n locally or use the cloud version:

**Local Installation**:

```bash
npm install -g n8n
n8n start
```

**Docker Installation**:

```bash
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
```

Access n8n at \`\[invalid url, do not cite\]

> :information_source: **Tip**: Use the cloud version for easier setup if you prefer not to manage a local instance.

### Step 2: Obtain OpenAI API Key

1. Sign up or log in at OpenAI.
2. Navigate to the API keys section.
3. Create a new secret key, name it (e.g., “n8n Integration”), and copy it.

> :information_source: **Note**: Store the API key securely and avoid sharing it publicly.

### Step 3: Configure OpenAI Credentials in n8n

1. In n8n, go to the “Credentials” section.
2. Click “Add Credential” and select “OpenAI API”.
3. Enter your API key and save the credential.

> :white_check_mark: **Success**: Your OpenAI credentials are now configured.

### Step 4: Create the Workflow

1. In n8n, create a new workflow named “AI Customer Support Agent”.
2. Add an **Email Read/IMAP** node to monitor incoming emails:
   - Select your email service (e.g., Gmail).
   - Enter SMTP credentials and configure the inbox to check.
   - Set to trigger on new emails.
3. Add an **OpenAI** node to generate a response:
   - Connect it to the Email Read node.
   - Select the “Chat” operation.
   - Choose the model (e.g., “gpt-4”).
   - Set the prompt to process the email content, e.g.:

     ```
     You are a customer support agent. Read the following email and generate a polite, professional response addressing the user's query: {{ $node["Email Read"].json["text"] }}
     ```
   - Adjust parameters like `temperature` (e.g., 0.7 for balanced responses).
4. Add an **Email Send** node to reply to the user:
   - Connect it to the OpenAI node.
   - Configure SMTP credentials.
   - Set the “To” field to `{{ $node["Email Read"].json["from"] }}`.
   - Set the “Subject” to “Re: {{ $node\["Email Read"\].json\["subject"\] }}”.
   - Set the “Message” to `{{ $node["OpenAI"].json["choices"][0]["message"]["content"] }}`.

**Workflow Overview**:

| Node | Purpose | Input | Output |
| --- | --- | --- | --- |
| Email Read/IMAP | Monitors inbox for new emails | None | Email content, sender, subject |
| OpenAI | Generates AI response | Email content | Response text |
| Email Send | Sends reply to user | AI response, sender | Email sent confirmation |

### Step 5: Test the Workflow

1. Save the workflow.
2. Send a test email to the monitored inbox (e.g., “How do I reset my password?”).
3. Execute the workflow manually to verify:
   - The Email Read node captures the email.
   - The OpenAI node generates a response (e.g., “To reset your password, visit our website…”).
   - The Email Send node delivers the reply.
4. Check your inbox for the response.
5. If successful, activate the workflow for continuous operation.

> :white_check_mark: **Success**: Your AI agent is now responding to customer emails automatically.

> **Note**: Monitor the workflow for rate limits or errors, as OpenAI may impose API restrictions.

## Example Use Case

This workflow automates customer support by processing incoming emails and generating responses. For example, a user emails, “What are your business hours?” The OpenAI node generates a response like, “Our business hours are 9 AM to 5 PM, Monday to Friday.” The Email Send node delivers this reply, reducing manual effort and improving response times.

You can customize the prompt to handle specific query types, such as product inquiries or technical support, enhancing the agent’s versatility.

## Related Topics

- n8n Advanced Workflows
- OpenAI API Reference
- Gmail SMTP Configuration
- Handling OpenAI Rate Limits

Was this article helpful?
|[:heavy_check_mark: Yes](javascript:void(0))|[:x: No](javascript:void(0))|

If you have questions, contact our support team at support@example.com.