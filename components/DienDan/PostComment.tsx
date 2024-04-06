import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { BinhLuanBaiViet } from '@constants/DienDan/DienDanTypes';
import { router } from 'expo-router';

interface PostCommentProps {
  data: BinhLuanBaiViet
}

const PostComment = ({ data }: PostCommentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.commentTop}>
        <Image style={styles.image} source={{ uri: data.user.image }} />
        <View style={styles.info}>
          <Text style={styles.name}>
            {data.user.name}
          </Text>
          <View style={styles.timeContainer}>
            <Ionicons name='time-outline' size={10} color={'orange'} />
            <Text style={styles.time}>{moment(data.createdAt).fromNow()}</Text>
          </View>
          <Text style={styles.commentText}>{data.noiDung}</Text>
        </View>
      </View>
      <View style={styles.commentBottom}>
        <Pressable android_ripple={{ color: "grey" }} style={styles.actionButton}>
          <AntDesign name='like1' size={16} color={'grey'} />
          <Text style={styles.actionText}>Thích
          </Text>
        </Pressable>
        <Pressable android_ripple={{ color: "grey" }} style={styles.actionButton}>
          <FontAwesome name='comment' size={16} color={'grey'} />
          <Text style={styles.actionText}>Trả lời
          </Text>
        </Pressable>
      </View>

    </View>
  );
};

export default PostComment;

const styles = StyleSheet.create({
  container: {
    gap: 6,
    marginBottom: 12,
    backgroundColor: 'white'
  },
  commentTop: {
    flexDirection: 'row',
    gap: 12,
    padding: 12
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'contain'
  },
  info: {
    gap: 2,
  },
  name: {
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  time: {
    color: 'grey',
    fontSize: 10
  },
  commentText: {
    lineHeight: 20,
    marginTop: 6
  },
  commentBottom: {
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 4,

  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
