provider "aws" {
  region = "us-east-1"
}

# Create a VPC for the EKS cluster
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.18.1"  # Specify a compatible version for the module

  name = "eks-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]

  enable_nat_gateway = true
  tags = {
    Environment = "dev"
    Project     = "eks-cluster"
  }
}

# Create an EKS cluster
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "19.0.0"  # Specify the EKS module version

  cluster_name    = "my-eks-cluster"
  cluster_version = "1.21"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  # Enable IAM Role for Service Accounts (IRSA)
  enable_irsa = true

  # Configure node groups
  node_groups = {
    eks_node_group = {
      desired_capacity = 2
      max_capacity     = 5
      min_capacity     = 1
      instance_type    = "t3.medium"

      # Configure node group tags
      tags = {
        Name        = "eks-node-group"
        Environment = "dev"
      }
    }
  }

  tags = {
    Environment = "dev"
    Project     = "eks-cluster"
  }
}
