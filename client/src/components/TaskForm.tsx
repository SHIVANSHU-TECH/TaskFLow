
import React, { useState, useEffect } from 'react';

interface TaskFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setStatus(initialData.status);
      setPriority(initialData.priority || 'medium');
      const dateStr = initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '';
      setDueDate(dateStr);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ title, description, status, priority, dueDate });
    setLoading(false);
  };

  const inputClasses = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm sm:text-base";
  const labelClasses = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 dark:text-slate-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div>
        <label className={labelClasses}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClasses}
          placeholder="What needs to be done?"
        />
      </div>
      
      <div>
        <label className={labelClasses}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClasses} min-h-[100px] resize-none`}
          placeholder="Add details..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
           <label className={labelClasses}>Priority</label>
           <select
             value={priority}
             onChange={(e) => setPriority(e.target.value)}
             className={inputClasses}
           >
             <option value="low">Low</option>
             <option value="medium">Medium</option>
             <option value="high">High</option>
           </select>
        </div>

        <div>
           <label className={labelClasses}>Status</label>
           <select
             value={status}
             onChange={(e) => setStatus(e.target.value)}
             className={inputClasses}
           >
             <option value="pending">To Do</option>
             <option value="in-progress">In Progress</option>
             <option value="completed">Done</option>
           </select>
        </div>
      </div>

      <div>
        <label className={labelClasses}>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95 transition-all duration-200"
        >
          {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
