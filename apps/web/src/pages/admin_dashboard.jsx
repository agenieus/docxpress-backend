import { useState } from 'react';
import { 
  Home, Search, FileText, Upload, Download, Share2, Trash2, 
  Eye, Edit3, FolderOpen, Users, Settings, Bell, User, 
  BarChart3, Clock, Star, Filter, Grid, List, Plus,
  ChevronDown, Menu, X, Calendar, Tag, Archive
} from 'lucide-react';

export default function DocXpressDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample data
  const documents = [
    { id: 1, name: 'Project Proposal.docx', type: 'Word Document', size: '2.4 MB', modified: '2 hours ago', owner: 'John Doe', starred: true },
    { id: 2, name: 'Financial Report Q3.pdf', type: 'PDF Document', size: '1.8 MB', modified: '5 hours ago', owner: 'Jane Smith', starred: false },
    { id: 3, name: 'Marketing Strategy.pptx', type: 'PowerPoint', size: '5.2 MB', modified: '1 day ago', owner: 'Mike Johnson', starred: true },
    { id: 4, name: 'Contract Template.docx', type: 'Word Document', size: '856 KB', modified: '2 days ago', owner: 'Sarah Wilson', starred: false },
    { id: 5, name: 'User Manual.pdf', type: 'PDF Document', size: '3.1 MB', modified: '3 days ago', owner: 'Alex Brown', starred: false },
    { id: 6, name: 'Budget Analysis.xlsx', type: 'Excel Sheet', size: '1.2 MB', modified: '4 days ago', owner: 'Emily Davis', starred: true },
  ];

  const stats = [
    { title: 'Total Documents', value: '1,234', icon: FileText, change: '+12%' },
    { title: 'Storage Used', value: '45.6 GB', icon: Archive, change: '+8%' },
    { title: 'Shared Files', value: '89', icon: Share2, change: '+23%' },
    { title: 'Active Users', value: '156', icon: Users, change: '+5%' },
  ];

  const recentActivities = [
    { action: 'Created', document: 'New Contract Template', user: 'John Doe', time: '5 min ago' },
    { action: 'Shared', document: 'Q3 Financial Report', user: 'Jane Smith', time: '15 min ago' },
    { action: 'Modified', document: 'Marketing Presentation', user: 'Mike Johnson', time: '1 hour ago' },
    { action: 'Deleted', document: 'Old Meeting Notes', user: 'Sarah Wilson', time: '2 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-[#07479D]">
          <h1 className="text-xl font-bold text-white">DocXpress</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            <a href="#" className="flex items-center px-4 py-3 text-[#07479D] bg-blue-50 rounded-lg font-medium">
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FileText className="h-5 w-5 mr-3" />
              All Documents
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <FolderOpen className="h-5 w-5 mr-3" />
              Folders
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Share2 className="h-5 w-5 mr-3" />
              Shared with Me
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Star className="h-5 w-5 mr-3" />
              Starred
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Clock className="h-5 w-5 mr-3" />
              Recent
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Trash2 className="h-5 w-5 mr-3" />
              Trash
            </a>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Users className="h-5 w-5 mr-3" />
              Team Management
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <BarChart3 className="h-5 w-5 mr-3" />
              Analytics
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden mr-4 text-gray-600 hover:text-gray-900"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Search Bar */}
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search documents, folders, and more..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07479D] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#07479D] rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">John Doe</div>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-[#07479D] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-[#07479D]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Documents Section */}
            <div className="xl:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Upload className="h-8 w-8 text-[#07479D] mb-2" />
                    <span className="text-sm font-medium text-gray-700">Upload File</span>
                  </button>
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Plus className="h-8 w-8 text-[#07479D] mb-2" />
                    <span className="text-sm font-medium text-gray-700">New Folder</span>
                  </button>
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-8 w-8 text-[#07479D] mb-2" />
                    <span className="text-sm font-medium text-gray-700">Share</span>
                  </button>
                  <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="h-8 w-8 text-[#07479D] mb-2" />
                    <span className="text-sm font-medium text-gray-700">Download</span>
                  </button>
                </div>
              </div>

              {/* Recent Documents */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
                    <div className="flex items-center space-x-2">
                      <select 
                        value={selectedFilter} 
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm"
                      >
                        <option value="all">All Files</option>
                        <option value="documents">Documents</option>
                        <option value="spreadsheets">Spreadsheets</option>
                        <option value="presentations">Presentations</option>
                      </select>
                      <div className="flex border border-gray-300 rounded">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-1 ${viewMode === 'grid' ? 'bg-[#07479D] text-white' : 'text-gray-600'}`}
                        >
                          <Grid className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-1 ${viewMode === 'list' ? 'bg-[#07479D] text-white' : 'text-gray-600'}`}
                        >
                          <List className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <FileText className="h-8 w-8 text-[#07479D]" />
                            <div className="flex space-x-1">
                              {doc.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                              <button className="text-gray-400 hover:text-gray-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600">
                                <Share2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">{doc.name}</h4>
                          <p className="text-xs text-gray-500">{doc.type}</p>
                          <p className="text-xs text-gray-500">{doc.size} • {doc.modified}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-6 w-6 text-[#07479D]" />
                            <div>
                              <h4 className="font-medium text-gray-900">{doc.name}</h4>
                              <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">{doc.modified}</span>
                            <span className="text-sm text-gray-500">{doc.owner}</span>
                            <div className="flex space-x-1">
                              {doc.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                              <button className="text-gray-400 hover:text-gray-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600">
                                <Share2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Storage Usage */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Usage</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Used Space</span>
                      <span className="font-medium">45.6 GB of 100 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#07479D] h-2 rounded-full" style={{ width: '45.6%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Documents</span>
                      <span>28.4 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Images</span>
                      <span>12.8 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Videos</span>
                      <span>4.4 GB</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-[#07479D] text-white rounded-lg hover:bg-[#063a84] transition-colors">
                    Upgrade Storage
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#07479D] rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action.toLowerCase()} 
                          <span className="font-medium"> {activity.document}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-[#07479D] text-sm font-medium hover:text-[#063a84]">
                  View All Activity
                </button>
              </div>

              {/* Team Members */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
                <div className="space-y-3">
                  {['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'].map((member, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#07479D] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{member.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{member}</p>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-[#07479D] text-sm font-medium hover:text-[#063a84]">
                  Invite Members
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}