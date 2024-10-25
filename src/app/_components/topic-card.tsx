import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TopicCardProps } from '../_type'

const TopicCard = ({ topic }: { topic: TopicCardProps }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className='h-full overflow-hidden'>
        <CardHeader className={`bg-gradient-to-br ${topic.color}`}>
          <CardTitle className='text-white flex items-center justify-between'>
            {topic.name}
            <topic.icon className='h-6 w-6' />
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <p className='text-sm text-gray-600'>
            Explore {topic.name.toLowerCase()} concepts and best practices.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TopicCard
