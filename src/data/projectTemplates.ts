
import { ProjectTemplate } from '@/types/templates';

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'web-development',
    name: 'Web Development Project',
    description: 'Complete web application development from planning to deployment',
    category: 'Development',
    icon: 'Code',
    estimatedDuration: 90,
    defaultStatus: 'active',
    tags: ['Frontend', 'Backend', 'Full Stack'],
    tasks: [
      {
        name: 'Requirements Analysis',
        description: 'Gather and analyze project requirements',
        duration: 5,
        dependencies: [],
        status: 'not-started',
        remarks: 'Critical foundation phase'
      },
      {
        name: 'UI/UX Design',
        description: 'Create wireframes and design mockups',
        duration: 10,
        dependencies: ['Requirements Analysis'],
        status: 'not-started',
        remarks: 'Design system and prototypes'
      },
      {
        name: 'Database Design',
        description: 'Design database schema and relationships',
        duration: 7,
        dependencies: ['Requirements Analysis'],
        status: 'not-started',
        remarks: 'Normalize data structure'
      },
      {
        name: 'Frontend Development',
        description: 'Implement user interface and interactions',
        duration: 30,
        dependencies: ['UI/UX Design'],
        status: 'not-started',
        remarks: 'Responsive design implementation'
      },
      {
        name: 'Backend Development',
        description: 'Develop server-side logic and APIs',
        duration: 25,
        dependencies: ['Database Design'],
        status: 'not-started',
        remarks: 'RESTful API development'
      },
      {
        name: 'Integration Testing',
        description: 'Test frontend and backend integration',
        duration: 8,
        dependencies: ['Frontend Development', 'Backend Development'],
        status: 'not-started',
        remarks: 'End-to-end testing'
      },
      {
        name: 'Deployment',
        description: 'Deploy application to production environment',
        duration: 5,
        dependencies: ['Integration Testing'],
        status: 'not-started',
        remarks: 'Production deployment and monitoring'
      }
    ]
  },
  {
    id: 'marketing-campaign',
    name: 'Marketing Campaign',
    description: 'Comprehensive marketing campaign from strategy to execution',
    category: 'Marketing',
    icon: 'Megaphone',
    estimatedDuration: 60,
    defaultStatus: 'active',
    tags: ['Digital Marketing', 'Social Media', 'Content'],
    tasks: [
      {
        name: 'Market Research',
        description: 'Analyze target audience and competitors',
        duration: 7,
        dependencies: [],
        status: 'not-started',
        remarks: 'Primary and secondary research'
      },
      {
        name: 'Campaign Strategy',
        description: 'Develop campaign objectives and strategy',
        duration: 5,
        dependencies: ['Market Research'],
        status: 'not-started',
        remarks: 'Define goals and KPIs'
      },
      {
        name: 'Content Creation',
        description: 'Create marketing materials and content',
        duration: 15,
        dependencies: ['Campaign Strategy'],
        status: 'not-started',
        remarks: 'Multi-channel content development'
      },
      {
        name: 'Social Media Setup',
        description: 'Set up and optimize social media accounts',
        duration: 3,
        dependencies: ['Campaign Strategy'],
        status: 'not-started',
        remarks: 'Platform optimization'
      },
      {
        name: 'Campaign Launch',
        description: 'Execute campaign across all channels',
        duration: 10,
        dependencies: ['Content Creation', 'Social Media Setup'],
        status: 'not-started',
        remarks: 'Multi-channel execution'
      },
      {
        name: 'Performance Monitoring',
        description: 'Monitor and optimize campaign performance',
        duration: 20,
        dependencies: ['Campaign Launch'],
        status: 'not-started',
        remarks: 'Ongoing optimization and reporting'
      }
    ]
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'End-to-end product launch from development to market release',
    category: 'Product',
    icon: 'Rocket',
    estimatedDuration: 120,
    defaultStatus: 'active',
    tags: ['Product Management', 'Launch', 'Go-to-Market'],
    tasks: [
      {
        name: 'Product Development',
        description: 'Develop and refine the product',
        duration: 45,
        dependencies: [],
        status: 'not-started',
        remarks: 'MVP development and testing'
      },
      {
        name: 'Market Analysis',
        description: 'Analyze market conditions and competition',
        duration: 10,
        dependencies: [],
        status: 'not-started',
        remarks: 'Competitive landscape analysis'
      },
      {
        name: 'Go-to-Market Strategy',
        description: 'Develop comprehensive launch strategy',
        duration: 8,
        dependencies: ['Market Analysis'],
        status: 'not-started',
        remarks: 'Positioning and messaging'
      },
      {
        name: 'Beta Testing',
        description: 'Conduct beta testing with select users',
        duration: 15,
        dependencies: ['Product Development'],
        status: 'not-started',
        remarks: 'User feedback collection'
      },
      {
        name: 'Marketing Materials',
        description: 'Create launch marketing materials',
        duration: 12,
        dependencies: ['Go-to-Market Strategy'],
        status: 'not-started',
        remarks: 'Collateral and digital assets'
      },
      {
        name: 'Sales Training',
        description: 'Train sales team on new product',
        duration: 5,
        dependencies: ['Beta Testing', 'Marketing Materials'],
        status: 'not-started',
        remarks: 'Product knowledge and positioning'
      },
      {
        name: 'Product Launch Event',
        description: 'Execute product launch event',
        duration: 3,
        dependencies: ['Sales Training'],
        status: 'not-started',
        remarks: 'Launch event and PR'
      },
      {
        name: 'Post-Launch Monitoring',
        description: 'Monitor product performance and feedback',
        duration: 22,
        dependencies: ['Product Launch Event'],
        status: 'not-started',
        remarks: 'Performance tracking and optimization'
      }
    ]
  },
  {
    id: 'event-planning',
    name: 'Event Planning',
    description: 'Complete event planning from concept to execution',
    category: 'Events',
    icon: 'Calendar',
    estimatedDuration: 75,
    defaultStatus: 'active',
    tags: ['Event Management', 'Logistics', 'Coordination'],
    tasks: [
      {
        name: 'Event Concept & Budget',
        description: 'Define event concept and establish budget',
        duration: 5,
        dependencies: [],
        status: 'not-started',
        remarks: 'Initial planning and budgeting'
      },
      {
        name: 'Venue Selection',
        description: 'Research and book event venue',
        duration: 8,
        dependencies: ['Event Concept & Budget'],
        status: 'not-started',
        remarks: 'Location scouting and booking'
      },
      {
        name: 'Vendor Coordination',
        description: 'Select and coordinate with vendors',
        duration: 12,
        dependencies: ['Venue Selection'],
        status: 'not-started',
        remarks: 'Catering, AV, decorations'
      },
      {
        name: 'Marketing & Promotion',
        description: 'Promote event and manage registrations',
        duration: 20,
        dependencies: ['Venue Selection'],
        status: 'not-started',
        remarks: 'Multi-channel promotion'
      },
      {
        name: 'Logistics Planning',
        description: 'Plan event logistics and timeline',
        duration: 10,
        dependencies: ['Vendor Coordination'],
        status: 'not-started',
        remarks: 'Detailed run-of-show'
      },
      {
        name: 'Event Execution',
        description: 'Execute the event',
        duration: 2,
        dependencies: ['Marketing & Promotion', 'Logistics Planning'],
        status: 'not-started',
        remarks: 'Day-of coordination'
      },
      {
        name: 'Post-Event Follow-up',
        description: 'Post-event analysis and follow-up',
        duration: 8,
        dependencies: ['Event Execution'],
        status: 'not-started',
        remarks: 'Feedback collection and reporting'
      }
    ]
  },
  {
    id: 'software-migration',
    name: 'Software Migration',
    description: 'Migrate from legacy system to new platform',
    category: 'IT',
    icon: 'ArrowRight',
    estimatedDuration: 100,
    defaultStatus: 'active',
    tags: ['Migration', 'Data Transfer', 'System Upgrade'],
    tasks: [
      {
        name: 'Current System Analysis',
        description: 'Analyze existing system and data',
        duration: 10,
        dependencies: [],
        status: 'not-started',
        remarks: 'Comprehensive system audit'
      },
      {
        name: 'Migration Planning',
        description: 'Develop detailed migration plan',
        duration: 8,
        dependencies: ['Current System Analysis'],
        status: 'not-started',
        remarks: 'Risk assessment and timeline'
      },
      {
        name: 'New System Setup',
        description: 'Configure new system environment',
        duration: 15,
        dependencies: ['Migration Planning'],
        status: 'not-started',
        remarks: 'Environment preparation'
      },
      {
        name: 'Data Mapping',
        description: 'Map data fields between systems',
        duration: 12,
        dependencies: ['Migration Planning'],
        status: 'not-started',
        remarks: 'Field mapping and transformation rules'
      },
      {
        name: 'Test Migration',
        description: 'Perform test migration with sample data',
        duration: 10,
        dependencies: ['New System Setup', 'Data Mapping'],
        status: 'not-started',
        remarks: 'Validation and testing'
      },
      {
        name: 'User Training',
        description: 'Train users on new system',
        duration: 8,
        dependencies: ['Test Migration'],
        status: 'not-started',
        remarks: 'Comprehensive user training'
      },
      {
        name: 'Production Migration',
        description: 'Execute production migration',
        duration: 5,
        dependencies: ['User Training'],
        status: 'not-started',
        remarks: 'Live data migration'
      },
      {
        name: 'Post-Migration Support',
        description: 'Provide post-migration support',
        duration: 32,
        dependencies: ['Production Migration'],
        status: 'not-started',
        remarks: 'Ongoing support and optimization'
      }
    ]
  }
];

export const templateCategories = [
  'All',
  'Development',
  'Marketing',
  'Product',
  'Events',
  'IT'
];
