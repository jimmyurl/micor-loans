export default function DashboardStats({ stats }) {
    // Function to determine border and text color based on type
    const getStyles = (type) => {
      switch (type) {
        case 'success':
          return {
            border: 'border-l-green-500',
            text: 'text-green-500'
          };
        case 'danger':
          return {
            border: 'border-l-red-500',
            text: 'text-red-500'
          };
        case 'warning':
          return {
            border: 'border-l-yellow-400',
            text: 'text-yellow-600'
          };
        default:
          return {
            border: 'border-l-green-800',
            text: 'text-green-800'
          };
      }
    };
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const styles = getStyles(stat.type);
          
          return (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow p-5 border-l-4 ${styles.border}`}
            >
              <h3 className="text-gray-700 text-sm font-medium mb-2">
                {stat.title}
              </h3>
              <p className={`text-2xl font-bold ${styles.text}`}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
    );
  }